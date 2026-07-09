/**
 * enquiry controller
 */

import { factories } from "@strapi/strapi";
import { loadEmailTemplate, safeSend } from "../../../utils/emailHelper";
import { verifyRecaptcha } from "../../../utils/recaptcha";
import { getAdminEmail } from "../../../utils/siteSettings";

export default factories.createCoreController(
  "api::enquiry.enquiry",

  ({ strapi }) => ({
    async create(ctx) {
      const { name, email, phone, message, captchaToken } =
        ctx.request.body ?? {};

      if (!captchaToken) return ctx.badRequest("Captcha missing");

      const verified = await verifyRecaptcha(captchaToken);
      if (!verified) return ctx.badRequest("Captcha verification failed");

      const documents = strapi.documents("api::enquiry.enquiry");

      const existing = await documents.findFirst({ filters: { email } });
      if (existing)
        return ctx.badRequest(
          "You have already submitted an enquiry with this email.",
        );

      const created = await documents.create({
        data: { name, email, phone, message },
      });

      const emailData = {
        NAME: name,
        EMAIL: email,
        PHONE: phone || "Not provided",
        MESSAGE: message,
        DATE: new Date().toLocaleDateString("en-IN", { dateStyle: "long" }),
      };

      const userHtml = loadEmailTemplate("contact-enquiry.html", emailData);
      const userEmailResponse = await safeSend({
        to: email,
        subject: "Thanks for contacting Wealth Lounge!",
        html: userHtml,
      });

      let adminEmailResponse = null;
      try {
        const adminEmail = await getAdminEmail(strapi);
        const adminHtml = loadEmailTemplate(
          "contact-admin-enquiry.html",
          emailData,
        );
        adminEmailResponse = await safeSend({
          to: adminEmail,
          subject: "New Enquiry Received",
          html: adminHtml,
        });
      } catch (err) {
        console.error("❌ Admin email lookup/send failed:", err);
      }

      ctx.body = {
        message: "Enquiry submitted successfully",
        data: created,
        email: {
          user: !!userEmailResponse,
          admin: !!adminEmailResponse,
        },
      };
    },
  }),
);
