import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function createTools() {
  const tools = await prisma.tools.createMany({
    data: [
      {
        name: "test",
        amount: "1000",
      },
      {
        name: "aspirador de pó",
        amount: "1500",
      },
      {
        name: "Test21",
        amount: "1200",
      },
      {
        name: "desempenadeira",
        amount: "3500",
      }
    ],
  });
  console.log('Create tools');
  return tools;
}
createTools();
