import { SES } from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider } from '../IMailProvider';

@injectable()
class SESMailProvider implements IMailProvider {
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

    // transporter.sendMail(mailOptions, function (err, info) {
    //   if (err) {
    //     res.json(err);
    //   } else {
    //     res.json(info);
    //   }
    // });
  }
}

export { SESMailProvider };
