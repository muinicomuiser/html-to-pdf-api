import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // Tamaño máximo del JSON de entrada
  app.use(
    json({
      limit:
        (configService.get<number>('JSON_BODY_MAX_SIZE') ?? 10) * 1024 * 1024,
    }),
  );
  // Habilitar métodos que se ejecutan al cerrar la aplicación
  app.enableShutdownHooks();
  const port: number = configService.get<number>('PORT') ?? 3000;

  await app.listen(port);
}

bootstrap();
