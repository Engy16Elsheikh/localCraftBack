import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {
  private currentMails: Record<string, number> = {};

  constructor(private mailService: MailerService) {}

  async sendCode(email: string, subject?: string) {
    const code = Math.floor(15000 + Math.random() * 80000);
    this.currentMails[email] = code;

    await this.mailService.sendMail({
      from: process.env.MAIL_SENDER,
      to: email,
      subject: subject || 'Welcome to Local Crafts marketplace',
      text: `To confirm your email, please use this code: ${code}`,
    });

    console.log(`Code sent to ${email}: ${code}`);
    return code;
  }

  validateCode(email: string, code: number) {
    const actual = this.currentMails[email];
    if (actual === code) {
      delete this.currentMails[email];
      return true;
    }
    return false;
  }
}