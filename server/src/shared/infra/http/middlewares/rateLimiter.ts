import { createClient } from 'redis';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { AppError } from '@shared/errors/AppError';
export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const redisClient = createClient({
    legacyMode: true,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });
  await redisClient.connect();
  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 30,
    duration: 1,
  });
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}
