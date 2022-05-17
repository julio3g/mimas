import { prisma } from '@database/prismaClient';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
export class UpdateUserUseCase {
  async execute({ id, name, email, phone, password }: IUserDTO) {
    const user = await prisma.users.findFirst({ where: { id } });
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.phone = phone ? phone : user.phone;
    user.password = password ? password : user.password;
    await prisma.users.update({
      where: { id },
      data: { name, email, phone, password },
    });
  }
}
