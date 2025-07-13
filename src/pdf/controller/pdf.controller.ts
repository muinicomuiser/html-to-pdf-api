import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from '../service/pdf.service';
import { CreateFromHTMLTextDTO } from '../dto/create.fromHTMLText.dto';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('htmltext')
  async getPdfTest(@Body() createFromHTMLTextDTO: CreateFromHTMLTextDTO, @Res() res: Response) {
    const pdfBuffer = await this.pdfService.convertHtmlToPdf(createFromHTMLTextDTO);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="documento.pdf"',
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);
  }
}
