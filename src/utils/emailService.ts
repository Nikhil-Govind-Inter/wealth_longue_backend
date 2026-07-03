// src/utils/emailService.ts

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

// src/utils/emailService.ts — unchanged
export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const from = process.env.EMAIL_FROM;
  const replyTo = process.env.EMAIL_REPLY_TO;
  return strapi.plugins['email'].services.email.send({
    to,
    subject,
    html,
    ...(from && { from }),
    ...(replyTo && { replyTo }),
  });
}