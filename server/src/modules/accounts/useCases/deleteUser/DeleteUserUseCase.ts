import { prisma } from '@database/prismaClient';

export class DeleteUserUseCase {
  async execute(id: string) {
    const user = await prisma.users.delete({
      where: { id: id },
    });
    return user;
  }
}
