import { PaperFormat } from 'puppeteer';

export class CreatePDFFormatOptions {
  format: PaperFormat = 'A4';
  printBackground: boolean = false;
}
