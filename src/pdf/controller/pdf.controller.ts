import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import {
  CreateFromHTMLTextDTO,
  CreateFromHTMLTextSchema,
} from '../dto/create.fromHTMLText.schema';
import { CreatePDFFormatOptions } from '../dto/create.pdfFormatOptions.schema';
import { MaxRequestFileSizeValidator } from '../pipe/maxRequestFileSizeValidator.pipe';
import { PdfService } from '../service/pdf.service';
import { ZodValidationPipe } from '../pipe/createFromHTMLTextValidation.pipe';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @UsePipes(new ZodValidationPipe(CreateFromHTMLTextSchema))
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
