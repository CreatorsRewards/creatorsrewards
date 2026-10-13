import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

interface SendMailInput {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface WelcomeCredentialsInput {
  to: string;
  name?: string | null;
  tempPassword: string;
  /** When the temporary password stops working, shown in the email */
  expiresAt?: Date | null;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: Transporter | null = null;

  /** Created on first use, so the app still boots without SMTP configured. */
  private getTransporter(): Transporter {
    if (this.transporter) return this.transporter;

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      throw new Error(
        'Email is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS.',
      );
    }

    const port = Number(SMTP_PORT ?? 587);
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    return this.transporter;
  }

  private async send({ to, subject, text, html }: SendMailInput) {
    const from = process.env.MAIL_FROM ?? process.env.SMTP_USER;
    // Log the recipient and subject only, never the body (it holds passwords)
    this.logger.log(`Sending "${subject}" to ${to}`);
    await this.getTransporter().sendMail({ from, to, subject, text, html });
  }

  async sendWelcomeCredentials({
    to,
    name,
    tempPassword,
    expiresAt,
  }: WelcomeCredentialsInput) {
    const appUrl = (process.env.APP_URL ?? 'http://localhost:3000').replace(
      /\/$/,
      '',
    );
    const loginUrl = `${appUrl}/login`;
    const greeting = name ? `Hi ${name},` : 'Hi there,';
    const expiry = expiresAt
      ? `This temporary password expires on ${expiresAt.toLocaleDateString(
          'en-GB',
          { day: 'numeric', month: 'long', year: 'numeric' },
        )}.`
      : '';

    const text = [
      greeting,
      '',
      "You're off the waitlist and your CreatorsRewards account is ready.",
      '',
      `Log in at: ${loginUrl}`,
      `Email: ${to}`,
      `Temporary password: ${tempPassword}`,
      '',
      "You'll be asked to choose a new password the first time you sign in.",
      expiry,
      '',
      "If you didn't expect this email, you can ignore it.",
    ]
      .filter((line, i, all) => line !== '' || all[i - 1] !== '')
      .join('\n');

    const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#1c1917">
  <h2 style="margin:0 0 16px;font-size:20px">
    Creators<span style="color:#fb7185">Rewards</span>
  </h2>
  <p>${escapeHtml(greeting)}</p>
  <p>You're off the waitlist and your account is ready.</p>
  <table style="width:100%;border-collapse:collapse;margin:16px 0;background:#fafaf9;border-radius:8px">
    <tr>
      <td style="padding:12px 16px;color:#78716c;font-size:13px">Email</td>
      <td style="padding:12px 16px;font-size:14px">${escapeHtml(to)}</td>
    </tr>
    <tr>
      <td style="padding:12px 16px;color:#78716c;font-size:13px">Temporary password</td>
      <td style="padding:12px 16px;font-size:16px;font-family:Consolas,Menlo,monospace;font-weight:bold;letter-spacing:1px">${escapeHtml(tempPassword)}</td>
    </tr>
  </table>
  <p style="margin:24px 0">
    <a href="${escapeHtml(loginUrl)}"
       style="background:#fb7185;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:bold;display:inline-block">
      Log in
    </a>
  </p>
  <p style="font-size:14px">You'll be asked to choose a new password the first time you sign in. ${escapeHtml(expiry)}</p>
  <p style="font-size:12px;color:#78716c">If you didn't expect this email, you can ignore it.</p>
</div>`;

    await this.send({
      to,
      subject: 'Your CreatorsRewards account is ready',
      text,
      html,
    });
  }
}