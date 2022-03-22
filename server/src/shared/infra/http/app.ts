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

const app = express();
app.use(cors());
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`User connection in ${socket.id}`);
});

app.use(express.json());
app.use(router);
app.use('/tools', express.static(`${upload.tmpFolder}/tools`));

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
