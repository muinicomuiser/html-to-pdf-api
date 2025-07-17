import { Logger, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PdfController } from './controller/pdf.controller';
import { PdfService } from './service/pdf.service';
@Module({
  imports: [MulterModule.register({})],
  controllers: [PdfController],
  providers: [PdfService, Logger],
})
export class PdfModule {}
