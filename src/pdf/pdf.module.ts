import { Logger, Module } from '@nestjs/common';
import { PdfController } from './controller/pdf.controller';
import { PdfService } from './service/pdf.service';

@Module({
  controllers: [PdfController],
  providers: [PdfService, Logger],
})
export class PdfModule {}
