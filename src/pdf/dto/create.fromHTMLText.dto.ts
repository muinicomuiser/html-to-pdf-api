import { PaperFormat } from "puppeteer";

export class CreateFromHTMLTextDTO{
    htmlContent: string;
    format: PaperFormat = "A4";
    printBackground: boolean = false;
}