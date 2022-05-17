import { AppError } from '@shared/errors/AppError';
import { prisma } from '@database/prismaClient';
import { NextFunction, Request, Response } from 'express';
export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;
  const users = prisma.users.findFirst({ where: { id: { equals: id } } });
  const user = await users;
  if (!user.isAdmin) throw new AppError("User isn't admin!");
  return next();
}
