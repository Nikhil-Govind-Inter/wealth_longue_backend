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
      provider: "strapi-provider-email-brevo",
      providerOptions: {
        apiKey: env("BREVO_API_KEY"),
      },
      settings: {
        defaultFrom: env("BREVO_DEFAULT_FROM"),
        defaultReplyTo: env("BREVO_DEFAULT_REPLY_TO"),
      },
    },
  },

  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
