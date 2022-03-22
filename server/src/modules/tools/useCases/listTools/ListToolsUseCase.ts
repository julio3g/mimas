import { prisma } from '@database/prismaClient';

export class ListToolsUseCase {
  async execute() {
    const tools = await prisma.tools.findMany({
      select: {
        id: true,
        name: true,
        amount: true,
        brand: {
          select: {
            name: true,
          },
        },
        available: true,
        using: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
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
            id: true,
            images_name: true,
          },
        },
      },
    });
    return tools;
  }
}
