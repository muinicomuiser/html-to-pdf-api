import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port: number = process.env.PORT ? +process.env.PORT : 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(port);
}

bootstrap();
