import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import csurf from 'csurf';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'localhost:3000', //cambiar segun el puerto de frontend
    methods: 'GET, HEAD, PATCH, POST, PUT, DELETE',
    credentials: true,
  });

  // Aplicar Rate Limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // Limitar a 100 solicitudes por IP
      message:
        'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.',
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.use(csurf());

  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
