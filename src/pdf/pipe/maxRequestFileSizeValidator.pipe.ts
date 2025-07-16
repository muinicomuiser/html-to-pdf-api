import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  MaxFileSizeValidator,
  PipeTransform,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MaxRequestFileSizeValidator implements PipeTransform {
  private readonly maxFileSizeValidator: MaxFileSizeValidator;

  constructor(private readonly configService: ConfigService) {
    const maxFileSizeMb =
      this.configService.get<number>('REQUEST_FILE_MAX_SIZE') ?? 20;
    const maxFileSizeInBytes = maxFileSizeMb * 1024 * 1024;

    this.maxFileSizeValidator = new MaxFileSizeValidator({
      maxSize: maxFileSizeInBytes,
      message: `El tamaño del archivo excede el límite permitido (${maxFileSizeMb} MB).`,
    });
  }

  async transform(value: Express.Multer.File) {
    if (!value) {
      throw new BadRequestException('Archivo no proporcionado.');
    }

    const isValidSize = this.maxFileSizeValidator.isValid(value);
    if (!isValidSize) {
      throw new BadRequestException(
        this.maxFileSizeValidator.buildErrorMessage(value),
      );
    }
    return value;
  }
}
