import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function createUserWorker() {
  const hashPassword = await hash('worker', 10);
  const userAlreadyExists = await prisma.users.findFirst({
    where: {
      OR: [
        { email: { equals: 'worker@example.com' }, phone: { equals: '999' } },
      ],
    },
  });
  if (userAlreadyExists) throw new Error('User already exists!');
  await prisma.users.create({
    data: {
      name: 'worker',
      email: 'worker@example.com',
      phone: '999',
      password: hashPassword,
    },
  });
  console.log('Create user worker');
}
createUserWorker();
