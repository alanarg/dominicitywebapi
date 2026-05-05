import { NestFactory } from '@nestjs/core';
import { JsonExceptionFilter } from './common/filters/json-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });

  app.useGlobalFilters(new JsonExceptionFilter());

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
