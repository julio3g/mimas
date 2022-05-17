import { prisma } from '@database/prismaClient';
import { IBrandDTO } from '@modules/tools/dtos/IBrandDTO';
export class UpdateBrandUseCase {
  async execute({ id, name }: IBrandDTO) {
    const brand = await prisma.brands.findFirst({ where: { id } });
    brand.name = name ? name : brand.name;
    await prisma.brands.update({ where: { id }, data: { name } });
  }
}
