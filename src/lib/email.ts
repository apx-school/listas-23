import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_TOKEN);

type EmailConfig = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail(emailConfig: EmailConfig) {
  return resend.emails.send(emailConfig);
}
