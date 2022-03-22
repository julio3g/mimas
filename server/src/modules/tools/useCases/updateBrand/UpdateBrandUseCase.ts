import { IBrandDTO } from '@modules/tools/dtos/IBrandDTO';
import { prisma } from '@database/prismaClient';

export class UpdateBrandUseCase {
  async execute({ id, name }: IBrandDTO) {
    const brand = await prisma.brands.findFirst({ where: { id } });
    brand.name = name ? name : brand.name;
    await prisma.brands.update({ where: { id }, data: { name } });
  }
}
