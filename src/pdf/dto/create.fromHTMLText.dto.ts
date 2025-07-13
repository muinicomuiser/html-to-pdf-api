import { CreatePDFFormatOptions } from './create.pdfFormatOptions';

export class CreateFromHTMLTextDTO extends CreatePDFFormatOptions {
  htmlContent: string;

  constructor(
    htmlContent: string,
    createPDFFormatOptions: CreatePDFFormatOptions,
  ) {
    super();
    this.format = createPDFFormatOptions.format;
    this.printBackground = createPDFFormatOptions.printBackground;
    this.htmlContent = htmlContent;
  }
}
