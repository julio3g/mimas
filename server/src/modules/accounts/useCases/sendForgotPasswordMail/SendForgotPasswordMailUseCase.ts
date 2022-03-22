import { resolve } from 'path';
import { v4 as uuidV4 } from 'uuid';
import { inject, injectable } from 'tsyringe';
import { prisma } from '@database/prismaClient';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}
  async execute(email: string): Promise<void> {
    const user = await prisma.users.findFirst({
      where: { email },
    });
    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );
    if (!user) throw new AppError("User does't exists!");
    const token = uuidV4();
    const expires_date = this.dateProvider.addHours(48);
    await prisma.usersTokens.create({
      data: {
        refresh_token: token,
        user_id: user.id,
        expires_date,
      },
    });
    const variables = {
      name: user.name,
      email: user.email,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };
    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath,
    );
  }
}

export { SendForgotPasswordMailUseCase };
