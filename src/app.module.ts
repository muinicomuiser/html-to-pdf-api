import { Module } from '@nestjs/common';
import { PdfModule } from './pdf/pdf.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PdfModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
