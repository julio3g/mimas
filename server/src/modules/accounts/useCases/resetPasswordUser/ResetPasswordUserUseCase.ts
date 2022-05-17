import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { prisma } from '@database/prismaClient';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
interface IRequest {
  token: string;
  password: string;
}
@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await prisma.usersTokens.findFirst({
      where: { refresh_token: token },
    });
    if (!userToken) throw new AppError('Token invalid!');
    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    )
      throw new AppError('Token expired!');
    const user = await prisma.users.findFirst({
      where: { id: userToken.user_id },
    });
    user.password = await hash(password, 10);
    await prisma.users.update({
      where: { id: user.id },
      data: { password: user.password },
    });
    await prisma.usersTokens.delete({ where: { id: userToken.id } });
  }
}
