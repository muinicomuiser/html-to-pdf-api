import { Logger, Module } from '@nestjs/common';
import { PdfController } from './controller/pdf.controller';
import { PdfService } from './service/pdf.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({})],
  controllers: [PdfController],
  providers: [PdfService, Logger],
})
export class PdfModule {}
