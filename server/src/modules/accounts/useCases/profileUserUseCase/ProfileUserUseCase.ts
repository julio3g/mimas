import { prisma } from '@database/prismaClient';
import { UserMap } from '@modules/accounts/mapper/UserMap';
export class ProfileUserUseCase {
  async execute(id: string) {
    const user = await prisma.users.findFirst({ where: { id } });
    return UserMap.toDTO(user);
  }
}
