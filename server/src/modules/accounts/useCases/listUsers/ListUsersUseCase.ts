import { prisma } from '@database/prismaClient';
export class ListUsersUseCase {
  async execute() {
    return await prisma.users.findMany({ orderBy: { name: 'asc' } });
  }
}
