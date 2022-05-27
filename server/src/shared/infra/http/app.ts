import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import upload from "@config/upload";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { AppError } from "@shared/errors/AppError";
import "@shared/providers";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import http from "http";
import { Server } from "socket.io";
import rateLimiter from "./middlewares/rateLimiter";
import { router } from "./routes";
const app = express();
app.use(rateLimiter);
Sentry.init({
  dsn: process.env.SENTRY_DNS,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});
app.use(express.json());
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  console.log(`User connection in ${socket.id}`);
});
app.use("/tools", express.static(`${upload.tmpFolder}/tools`));
app.use(cors());
app.use(router);
app.use(Sentry.Handlers.errorHandler());
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError)
      return response.status(err.statusCode).json({ message: err.message });
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);
export { serverHttp, io };
