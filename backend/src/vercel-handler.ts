import 'reflect-metadata';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import { AppModule } from './app.module';

const server = express();
let bootstrap: Promise<void> | null = null;

async function createApp() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');
  await app.init();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  bootstrap ??= createApp();
  await bootstrap;
  server(req, res);
}
