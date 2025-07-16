import { PaperFormat, PDFMargin } from 'puppeteer';

export class CreatePDFFormatOptions {
  /**
   * Scales the rendering of the web page. Amount must be between `0.1` and `2`.
   * @defaultValue `1`
   */
  scale?: number;
  /**
   * Set to `true` to print background graphics.
   * @defaultValue `false`
   */
  printBackground?: boolean;
  /**
   * Whether to print in landscape orientation.
   * @defaultValue `false`
   */
  landscape?: boolean;
  /**
   * Paper ranges to print, e.g. `1-5, 8, 11-13`.
   * @defaultValue The empty string, which means all pages are printed.
   */
  pageRanges?: string;
  /**
   * @remarks
   * If set, this takes priority over the `width` and `height` options.
   * @defaultValue `letter`.
   */
  format?: PaperFormat;
  /**
   * Sets the width of paper. You can pass in a number or a string with a unit.
   */
  width?: string | number;
  /**
   * Sets the height of paper. You can pass in a number or a string with a unit.
   */
  height?: string | number;
  /**
   * Set the PDF margins.
   * @defaultValue `undefined` no margins are set.
   */
  margin?: PDFMargin;
   /**
  * Hides default white background and allows generating pdfs with transparency.
  * @defaultValue `false`
  */
  omitBackground?: boolean;

  constructor(
    scale?: number,
    printBackground?: boolean,
    landscape?: boolean,
    pageRanges?: string,
    format?: PaperFormat,
    width?: string | number,
    height?: string | number,
    margin?: PDFMargin,
    omitBackground?: boolean
  ){
    this.scale = scale
    this.printBackground = printBackground
    this.landscape = landscape
    this.pageRanges = pageRanges
    this.format = format
    this.width = width
    this.height = height
    this.margin = margin
    this.omitBackground = omitBackground
  }
}
