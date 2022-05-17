import { hash } from 'bcryptjs';
import { Users } from '@prisma/client';
import { prisma } from '@database/prismaClient';
import { AppError } from '@shared/errors/AppError';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
export class CreateUserUseCase {
  async execute({ name, email, phone, password }: IUserDTO): Promise<Users> {
    const userAlreadyExists = await prisma.users.findFirst({
      where: { OR: [{ email, phone }] },
    });
    if (userAlreadyExists) throw new AppError('User already exists!');
    const hashPassword = await hash(password, 10);
    const user = await prisma.users.create({
      data: { name, email, phone, password: hashPassword },
    });
    return user;
  }
}
