import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CreateFromHTMLTextDTO } from '../dto/create.fromHTMLText.dto';
import { CreatePDFFormatOptions } from '../dto/create.pdfFormatOptions';
import { MaxRequestFileSizeValidator } from '../pipe/maxRequestFileSizeValidator.pipe';
import { PdfService } from '../service/pdf.service';

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
    @UploadedFile(
      MaxRequestFileSizeValidator,
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'text/html',
            skipMagicNumbersValidation: true,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
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
