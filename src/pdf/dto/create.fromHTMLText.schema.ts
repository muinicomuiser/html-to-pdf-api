import { z } from 'zod';
import { CreatePDFFormatOptionsSchema } from './create.pdfFormatOptions.schema';

export const CreateFromHTMLTextSchema = z.object({
  createPDFFormatOptions: CreatePDFFormatOptionsSchema.optional(),
  htmlContent: z.string(),
});

export type CreateFromHTMLTextDTO = z.infer<typeof CreateFromHTMLTextSchema>;
