import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';
import { router } from './routes';
import '@shared/providers';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import upload from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

const app = express();

app.use(rateLimiter);
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(express.json());
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`User connection in ${socket.id}`);
});

app.use('/tools', express.static(`${upload.tmpFolder}/tools`));
app.use(cors());
app.use(router);
app.use(Sentry.Handlers.errorHandler());
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError)
      return response.status(err.statusCode).json({ message: err.message });
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
