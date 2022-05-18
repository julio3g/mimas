import auth from '@config/auth';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { prisma } from '@database/prismaClient';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
interface IPayload {
  sub: string;
  email: string;
}
interface ITokenResponse {
  token: string;
  refresh_token: string;
}
@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}
  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = sub;
    const userToken = await prisma.usersTokens.findFirst({
      where: { user_id, refresh_token: token },
    });
    if (!userToken) throw new AppError("Refresh Token does't exists!");
    await prisma.usersTokens.delete({ where: { id: userToken.id } });
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });
    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
    );
    await prisma.usersTokens.create({
      data: {
        expires_date,
        refresh_token,
        user_id,
      },
    });
    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });
    return {
      token: newToken,
      refresh_token,
    };
  }
}
