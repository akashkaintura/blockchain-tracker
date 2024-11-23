export const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: +process.env.SMTP_PORT || 587,
  user: process.env.SMTP_USER || 'your-email@example.com',
  pass: process.env.SMTP_PASS || 'your-password',
  from: process.env.SMTP_FROM || 'no-reply@example.com',
};
