import auth from '@config/auth';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { prisma } from '@database/prismaClient';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
interface IRequest {
  email: string;
  phone: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    phone: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}
@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}
  async execute({ email, phone, password }: IRequest) {
    const user = await prisma.users.findFirst({
      where: { OR: [{ email, phone }] },
    });
    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch || !user)
      throw new AppError('Email, phone or password incorrect!');
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });
    const refresh_token = sign({ email, phone }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });
    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );
    await prisma.usersTokens.create({
      data: {
        user_id: user.id,
        refresh_token,
        expires_date: refresh_token_expires_date,
      },
    });
    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
      token,
      refresh_token,
    };
    return tokenReturn;
  }
}
