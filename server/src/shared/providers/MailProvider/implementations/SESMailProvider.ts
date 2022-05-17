import fs from 'fs';
import { SES } from 'aws-sdk';
import handlebars from 'handlebars';
import { injectable } from 'tsyringe';
import { IMailProvider } from '../IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_CLIENT,
        pass: process.env.PASSWORD_EMAIL_CLIENT,
      },
    });
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);
    await this.client.sendMail({
      to,
      from: 'ToolManager <construagil@hotmail.com>',
      subject,
      html: templateHTML,
    });
  }
}
