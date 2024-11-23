import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendEmail(to: string, subject: string, text: string) {
    const info = await this.transporter.sendMail({
      from: `"Blockchain Tracker" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      text,
    });

    console.log('Message sent: %s', info.messageId);
  }
}
