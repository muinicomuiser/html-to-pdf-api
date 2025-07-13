import { PaperFormat } from 'puppeteer';

export class CreatePDFFormatOptions {
  format: PaperFormat = 'LETTER';
  printBackground: boolean = false;
}
