import { prisma } from "@database/prismaClient";
export class ListToolsUseCase {
  async execute() {
    return await prisma.tools.findMany({
      orderBy: {
        name: "asc",
      },
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
            user: true,
          },
        },
        toolsImage: {
          select: {
            id: true,
            image_name: true,
          },
        },
      },
    });
  }
}
