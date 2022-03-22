import { prisma } from '@database/prismaClient';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';

export class UpdateUserUseCase {
  async execute({ id, name, email, phone, password }: IUserDTO) {
    const user = await prisma.users.update({
      where: { id: id },
      data: { name, email, phone, password },
    });
    return user;
  }
}
