import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { CreateFromHTMLTextDTO } from '../dto/create.fromHTMLText.dto';
import { CreatePDFFormatOptions } from '../dto/create.pdfFormatOptions';

@Injectable()
export class PdfService implements OnModuleInit, OnApplicationShutdown {
  private browser: puppeteer.Browser;

  constructor(
    private readonly pdfServiceLogger: Logger
  ) {
    this.pdfServiceLogger = new Logger(PdfService.name);
  }

  async onModuleInit() {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
      });
      this.pdfServiceLogger.log('Navegador Puppeteer iniciado.');
    } catch (error) {
      this.pdfServiceLogger.error(
        'Error al iniciar el navegador Puppeteer:',
        error,
      );
      throw new InternalServerErrorException(
        'Fallo al iniciar el servicio de PDF: Navegador no disponible.',
      );
    }
  }

  async onApplicationShutdown(signal?: string) {
    if (this.browser) {
      this.pdfServiceLogger.log(
        `La aplicación se está deteniendo. Señal recibida: ${signal}`,
      );
      await this.browser.close();
      this.pdfServiceLogger.log('Navegador Puppeteer cerrado.');
    }
  }

  /**Convierte un texto en formato HTML a un archivo PDF */
  async convertHtmlTextToPdf(
    createFromHTMLTextDTO: CreateFromHTMLTextDTO,
  ): Promise<Uint8Array> {
    if (!this.browser) {
      throw new InternalServerErrorException(
        'El servicio de PDF no está listo: Navegador no iniciado.',
      );
    }

    let page: puppeteer.Page | null = null;
    try {
      page = await this.browser.newPage();

      await page.setContent(createFromHTMLTextDTO.htmlContent, {
        waitUntil: 'networkidle0',
      });

      const pdfBuffer = await page.pdf(createFromHTMLTextDTO.createPDFFormatOptions);

      return pdfBuffer;
    } catch (error) {
      this.pdfServiceLogger.error('Error al convertir HTML a PDF:', error);
      throw new InternalServerErrorException('Error al generar el PDF.');
    } finally {
      if (page) {
        await page.close();
      }
    }
  }
  /**Convierte un archivo en formato HTML a un archivo PDF */
  async convertHTMLFileToPdf(
    file: Express.Multer.File,
    createPDFFormatOptions: CreatePDFFormatOptions,
  ) {
    const bufferString = file.buffer.toString();
    const textToPdfDTO: CreateFromHTMLTextDTO = new CreateFromHTMLTextDTO(
      bufferString,
      createPDFFormatOptions,
    );
    return this.convertHtmlTextToPdf(textToPdfDTO);
  }
}
