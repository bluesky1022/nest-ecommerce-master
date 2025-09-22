import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MONGO_URI, PORT } from './config/common';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //enable validation globally
  app.useGlobalPipes(new ValidationPipe({whitelist:true, forbidNonWhitelisted: true}));
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  mongoose.connect(MONGO_URI)
          .then(() => console.log("MongoDB Connected ..."))
  const port = process.env.PORT ?? PORT;
  await app.listen(PORT)
            .then(() => console.log(`Server is listening on port ${port}`))
}
bootstrap();