import { prisma } from '@database/prismaClient';
export class ListCommentsUseCase {
  async execute() {
    // const listComments = await prisma.comments.findMany({
    //   orderBy: {
    //     created_at: 'desc',
    //   },
    //   select: {
    //     id: true,
    //     comment: true,
    //     user: {
    //       select: {
    //         name: true,
    //       },
    //     },
    //     created_at: true,
    //   },
    // });
    // return listComments;
    return await prisma.comments.findMany({
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        comment: true,
        user: {
          select: {
            name: true,
          },
        },
        created_at: true,
      },
    });
  }
}
