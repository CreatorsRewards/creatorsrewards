import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // { abortOnError: false }

  // Retrieve ConfigService from the app instance
  const configService = app.get(ConfigService);
  const frontendUrl =
    configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';

  // Enable CORS
  app.enableCors({
    origin: [
      frontendUrl, // Your production Next.js frontend (from .env)
      'http://localhost:3000', // Local development fallback
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Required if you are passing cookies, tokens, or authorization headers
  });

  // This automatically prepends /api to EVERY controller in your app
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
