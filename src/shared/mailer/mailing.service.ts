import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';

 
const WINDOW_MS = 10 * 60 * 1000;

@Injectable()
export class MailingService {
  constructor(private mailService: MailerService) {}

  private secret() {
    return process.env.CODE_SECRET || process.env.JWT_SECRET || '';
  }

  private codeFor(email: string, window: number): number {
    const hash = createHmac('sha256', this.secret())
      .update(`${email.toLowerCase()}:${window}`)
      .digest();
    // رقم من 5 خانات: 10000 – 99999
    return 10000 + (hash.readUInt32BE(0) % 90000);
  }

  async sendCode(email: string, subject?: string) {
    const window = Math.floor(Date.now() / WINDOW_MS);
    const code = this.codeFor(email, window);

    await this.mailService.sendMail({
      from: process.env.MAIL_SENDER,
      to: email,
      subject: subject || 'Welcome to Local Crafts marketplace',
      text: `To confirm your email, please use this code: ${code}`,
    });

    return code;
  }

  validateCode(email: string, code: number) {
    const window = Math.floor(Date.now() / WINDOW_MS);
    const input = Number(code);
    return [window, window - 1].some(
      (w) => this.codeFor(email, w) === input,
    );
  }
}