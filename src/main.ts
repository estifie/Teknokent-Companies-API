import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    logger: ['error', 'warn', 'log', 'debug'],
  });

  const documentVersion = process.env.VERSION || 'v1';
  const version = process.env.VERSION || 'v1';
  const port = process.env.PORT || 3000;

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix(`api/${version}`);

  const documentConfig = new DocumentBuilder()
    .setTitle('Teknokent Companies API')
    .setDescription('Teknokent Companies API for scraping and managing companies in teknokents')
    .setVersion(documentVersion)
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup(`api/${version}/docs`, app, document);

  await app.listen(port);
}
bootstrap();
