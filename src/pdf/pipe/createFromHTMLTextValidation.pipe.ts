import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      const errorMessages = JSON.parse(error.message).map((error) => {
        const details = {
          property: (error.path as string[]).join('.'),
          message: error.message.replaceAll('"', "'"),
        };
        if (error.errors) {
          details['errors'] = error.errors.map((error) => error[0].message);
        }
        return details;
      });
      throw new BadRequestException(errorMessages);
    }
  }
}
