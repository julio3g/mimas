import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function createBrands() {
  await prisma.brands.createMany({
    data: [
      {
        name: "test",
      },
      {
        name: "Motomil",
      },
      {
        name: "Tekna",
      }
    ],
  });
  console.log('Create brands');
}
createBrands();
