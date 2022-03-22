import { prisma } from '@database/prismaClient';

export class ListUsersUseCase {
  async execute() {
    const users = await prisma.users.findMany();
    return users;
  }
}
