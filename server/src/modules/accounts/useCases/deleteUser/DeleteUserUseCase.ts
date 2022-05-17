import { prisma } from '@database/prismaClient';
export class DeleteUserUseCase {
  async execute(id: string) {
    return await prisma.users.delete({ where: { id } });
  }
}
