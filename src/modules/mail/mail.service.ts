import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  async enviarEmailCadastro(email: string, senha: string) {
    await this.transporter.sendMail({
     from: `"Dominicity" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Seu acesso ao sistema Dominicity',
    html: `
      <div style="
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f4f6f8;
        padding: 24px;
      ">
        <div style="
          max-width: 520px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        ">
          <h2 style="color: #111827; margin-top: 0;">
            Bem-vindo(a) ao Dominicity 🎉
          </h2>

          <p style="color: #374151; font-size: 14px;">
            Seu cadastro foi realizado com sucesso.
          </p>

          <p style="color: #374151; font-size: 14px;">
            Utilize a senha abaixo para acessar o sistema:
          </p>

          <div style="
            background-color: #f3f4f6;
            border: 1px dashed #d1d5db;
            padding: 16px;
            border-radius: 6px;
            text-align: center;
            margin: 16px 0;
          ">
            <span style="
              font-size: 20px;
              font-weight: bold;
              letter-spacing: 1px;
              color: #111827;
            ">
              ${senha}
            </span>
          </div>

        
          <p style="color: #6b7280; font-size: 12px; margin-top: 24px;">
            Se você não solicitou este cadastro, ignore este e-mail.
          </p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

          <p style="color: #9ca3af; font-size: 11px; text-align: center;">
            © ${new Date().getFullYear()} Dominicity • Este é um e-mail automático
          </p>
        </div>
      </div>
    `,
    });
  }
}
