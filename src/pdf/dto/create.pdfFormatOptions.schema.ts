import z from 'zod';

const LowerCasePaperFormat = [
  'letter',
  'legal',
  'tabloid',
  'ledger',
  'a0',
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
];
const PDFMarginSchema = z.object({
  top: z.union([z.string(), z.number()]).optional(),
  bottom: z.union([z.string(), z.number()]).optional(),
  left: z.union([z.string(), z.number()]).optional(),
  right: z.union([z.string(), z.number()]).optional(),
});

export const CreatePDFFormatOptionsSchema = z.object({
  /**
   * Scales the rendering of the web page. Amount must be between `0.1` and `2`.
   * @defaultValue `1`
   */
  scale: z.number().min(0.1).max(2).optional(),
  /**
   * Set to `true` to print background graphics.
   * @defaultValue `false`
   */
  printBackground: z.boolean().optional(),
  /**
   * Whether to print in landscape orientation.
   * @defaultValue `false`
   */
  landscape: z.boolean().optional(),
  /**
   * Paper ranges to print, e.g. `1-5, 8, 11-13`.
   * @defaultValue The empty string, which means all pages are printed.
   */
  // *** Determinar filtro formato
  pageRanges: z.string().optional(),
  /**
   * @remarks
   * If set, this takes priority over the `width` and `height` options.
   * @defaultValue `letter`.
   */
  format: z
    .string()
    .transform((val) => val.toLowerCase())
    .pipe(z.enum(LowerCasePaperFormat))
    .optional(),
  /**
   * Sets the width of paper. You can pass in a number or a string with a unit.
   */
  width: z.union([z.string(), z.number()]).optional(),
  /**
   * Sets the height of paper. You can pass in a number or a string with a unit.
   */
  height: z.union([z.string(), z.number()]).optional(),
  /**
   * Set the PDF margins.
   * @defaultValue `undefined` no margins are set.
   */
  margin: PDFMarginSchema.optional(),
  /**
   * Hides default white background and allows generating pdfs with transparency.
   * @defaultValue `false`
   */
  omitBackground: z.boolean().optional(),
});

export type CreatePDFFormatOptions = z.infer<
  typeof CreatePDFFormatOptionsSchema
>;
