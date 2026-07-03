// export default ({ env }) => ({
//   email: {
//     config: {
//       provider: 'sendmail',
//       providerOptions: {
//         // Optional: customize underlying sendmail options here
//       },
//       settings: {
//         defaultFrom: 'jishnu@intersmart.in',
//         defaultReplyTo: 'jishnu@intersmart.in',
//       },
//     },
//   },
// });


export default ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env.int('SMTP_PORT'),
        secure: false,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_FROM'),
        defaultReplyTo: env('EMAIL_REPLY_TO'),
      },
    },
  },
});