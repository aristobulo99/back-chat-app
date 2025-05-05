import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Chat APP')
    .setDescription('Aplicación de chat para el aprendizaje de Nest.js con JWT, WEBSocket y documentación con swagger')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header'
    }, 'access-token')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {swaggerOptions : {persistAuthorization: true}});

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
