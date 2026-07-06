import { factories } from "@strapi/strapi";
import { loadEmailTemplate } from "../../../utils/emailHelper";
import * as nodemailer from "nodemailer";
import { sendEmail } from "../../../utils/emailService";
import { verifyRecaptcha } from "../../../utils/recaptcha";

export default factories.createCoreController(
  "api::contact-enquiry.contact-enquiry",
  ({ strapi }) => ({
    async completeEnquiryForm(ctx) {
      const { name, email, phone, message, captchaToken } = ctx.request.body.data || {};

      if (!captchaToken) {
        return ctx.badRequest("Captcha token is missing.");
      }

      const verified = await verifyRecaptcha(captchaToken);
      if (!verified) {
        return ctx.badRequest("Captcha verification failed.");
      }

      // find email from db
      const existingEmail = await strapi
        .documents("api::contact-enquiry.contact-enquiry")
        .findFirst({
          filters: { email },
        });

      if (existingEmail) {
        return ctx.badRequest("You have already submitted an enquiry with this email.");
      }

      const response = await strapi
        .documents("api::contact-enquiry.contact-enquiry")
        .create({
          data: { name, email, phone, message },
        });

      console.log("email from frontend : ", email);

      const html = loadEmailTemplate("contact-enquiry.html", {
        NAME: name,
        EMAIL: email,
        PHONE: phone || "Not provided",
        MESSAGE: message,
        DATE: new Date().toLocaleDateString("en-IN", { dateStyle: "long" }),
      });

      try {
        await sendEmail({
          to: email,
          subject: "Thanks for contacting Wealth Lounge!",
          html,
        });

        console.log(`✅ Email sent to: ${email}`);
        ctx.body = {
          message: "Enquiry submitted successfully",
          data: response,
        };
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError);
        ctx.body = {
          message: "Enquiry saved but email failed",
          data: response,
        };
      }
    },
  }),
);
