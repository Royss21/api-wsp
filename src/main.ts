import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { envs } from './config';
import { AllExceptionsFilter } from './core/exceptions/all-exceptions-filter';
import { HttpResponseInterceptor } from './common/interceptors/http-response.interceptor';

//https://github.com/WhiskeySockets/Baileys
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = new Logger('AppMain');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalInterceptors(new HttpResponseInterceptor());

  await app.listen(envs.port);
  logger.log(`App running on port ${envs.port}`);
}
bootstrap();
