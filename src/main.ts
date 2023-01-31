import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from './common/constants/config';
import { Logger } from '@nestjs/common';
import { patchNestJsSwagger } from 'nestjs-zod';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const globalPrefix = CONFIG.GLOBAL_PREFIX;
  const swaggerPrefix = CONFIG.SWAGGER_PREFIX;
  const port = CONFIG.PORT;

  patchNestJsSwagger();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);

  // Swagger Config
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Posty API')
    .setDescription('The Posty API Documentation')
    .setVersion('1.0')
    .addTag('posty')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPrefix, app, document);

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
    Logger.log(
      `Swagger Documentation at http://localhost:${port}/${swaggerPrefix}`,
    );
  });
}
bootstrap();
