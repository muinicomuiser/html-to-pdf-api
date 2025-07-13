import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from '../service/pdf.service';
import { CreateFromHTMLTextDTO } from '../dto/create.fromHTMLText.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePDFFormatOptions } from '../dto/create.pdfFormatOptions';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('htmltext')
  async generatePDFFromHTMLText(
    @Body() createFromHTMLTextDTO: CreateFromHTMLTextDTO,
    @Res() res: Response,
  ) {
    const pdfBuffer = await this.pdfService.convertHtmlTextToPdf(
      createFromHTMLTextDTO,
    );
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="documento.pdf"',
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);
  }

  @Post('htmlfile')
  @UseInterceptors(FileInterceptor('file'))
  async generatePDFFromHTMLFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPDFFormatOptions: CreatePDFFormatOptions,
    @Res() res: Response,
  ) {
    const pdfBuffer = await this.pdfService.convertHTMLFileToPdf(
      file,
      createPDFFormatOptions,
    );
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="documento.pdf"',
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);
  }
}
