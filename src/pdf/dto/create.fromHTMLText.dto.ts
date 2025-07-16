import { CreatePDFFormatOptions } from './create.pdfFormatOptions';

export class CreateFromHTMLTextDTO {
  htmlContent: string;
  createPDFFormatOptions: CreatePDFFormatOptions;
  constructor(
    htmlContent: string,
    createPDFFormatOptions: CreatePDFFormatOptions,
  ) {
    this.htmlContent = htmlContent;
    this.createPDFFormatOptions = createPDFFormatOptions;
  }
}
