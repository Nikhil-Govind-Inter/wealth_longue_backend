// src/middlewares/recaptcha.ts
import { verifyRecaptcha } from "../utils/recaptcha";

export default () => {
  return async (ctx, next) => {
    if (ctx.method === "POST" && ctx.path === "/api/contact-enquiries") {
      const { recaptchaToken, ...rest } = ctx.request.body.data || {};

      if (!recaptchaToken) {
        return ctx.badRequest("reCAPTCHA token is missing.");
      }

      const isHuman = await verifyRecaptcha(recaptchaToken);
      if (!isHuman) {
        return ctx.badRequest("reCAPTCHA verification failed.");
      }

      // Remove token before Strapi validates schema
      ctx.request.body.data = rest;
    }

    await next();
  };
};