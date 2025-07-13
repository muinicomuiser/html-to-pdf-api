import {
  Injectable,
  InternalServerErrorException,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Logger } from '@nestjs/common';
import { CreateFromHTMLTextDTO } from '../dto/create.fromHTMLText.dto';

@Injectable()
export class PdfService implements OnModuleInit, OnApplicationShutdown {
  private browser: puppeteer.Browser;

  constructor(private readonly pdfServiceLogger: Logger) {
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
      this.pdfServiceLogger.log('Navegador Puppeteer inicializado.');
    } catch (error) {
      this.pdfServiceLogger.error(
        'Error al inicializar el navegador Puppeteer:',
        error,
      );
      throw new InternalServerErrorException(
        'Fallo al inicializar el servicio de PDF: Navegador no disponible.',
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

  async convertHtmlToPdf(createFromHTMLTextDTO: CreateFromHTMLTextDTO): Promise<Uint8Array> {
    if (!this.browser) {
      throw new InternalServerErrorException(
        'El servicio de PDF no está listo: Navegador no inicializado.',
      );
    }

    let page: puppeteer.Page | null = null;
    try {
      page = await this.browser.newPage();

      await page.setContent(createFromHTMLTextDTO.htmlContent, {
        waitUntil: 'networkidle0',
      });

      const pdfBuffer = await page.pdf({
        format: createFromHTMLTextDTO.format,
        printBackground: createFromHTMLTextDTO.printBackground,
      });

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
}
