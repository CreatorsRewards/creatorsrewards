import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // { abortOnError: false }

  // This automatically prepends /api to EVERY controller in your app
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
