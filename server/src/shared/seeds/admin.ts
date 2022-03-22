import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function createUserAdmin() {
  const hashPassword = await hash('admin', 10);
  const userAlreadyExists = await prisma.users.findFirst({
    where: {
      OR: [
        { email: { equals: 'admin@example.com' }, phone: { equals: '111' } },
      ],
    },
  });
  if (userAlreadyExists) throw new Error('User admin already exists!');
  await prisma.users.create({
    data: {
      name: 'admin',
      email: 'admin@example.com',
      phone: '111',
      password: hashPassword,
      isAdmin: true,
    },
  });
  console.log('Create user admin ⚙️');
}

createUserAdmin();
