import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 4000);
  const corsOrigin = process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) ?? [
    "http://localhost:3001",
    "http://localhost:3000"
  ];

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: corsOrigin,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );

  await app.listen(port, "127.0.0.1");
}

void bootstrap();
