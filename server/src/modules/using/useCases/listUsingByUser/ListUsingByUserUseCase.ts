import { prisma } from '@database/prismaClient';

export class ListUsingByUserUseCase {
  async execute(user_id: string) {
    const rentalsByUser = await prisma.using.findMany({
      where: { user_id },
      select: {
        id: true,
        user_id: true,
        tool_id: true,
        created_at: true,
        tool: {
          include: {
            brand: {
              select: {
                name: true,
              },
            },
            comments: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            toolsImage: {
              select: {
                images_name: true,
              },
            },
          },
        },
      },
    });
    return rentalsByUser;
  }
}
