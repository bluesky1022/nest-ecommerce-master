import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MONGO_URI, PORT } from './config/common';
import mongoose from 'mongoose';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //enable validation globally
  app.useGlobalPipes(new ValidationPipe({whitelist:true, forbidNonWhitelisted: true}));
  mongoose.connect(MONGO_URI)
          .then(() => console.log("MongoDB Connected ..."))
  const port = process.env.PORT ?? PORT;
  app.use(cors());
  await app.listen(PORT, () => console.log(`Server is running on port ${port}`))
}
bootstrap();