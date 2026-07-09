import { factories } from "@strapi/strapi";
import { loadEmailTemplate, safeSend } from "../../../utils/emailHelper";
import { verifyRecaptcha } from "../../../utils/recaptcha";
import { getAdminEmail } from "../../../utils/siteSettings";

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

      const documents = strapi.documents("api::contact-enquiry.contact-enquiry");
      const existingEmail = await documents.findFirst({ filters: { email } });
      if (existingEmail) {
        return ctx.badRequest("You have already submitted an enquiry with this email.");
      }

      const response = await documents.create({ data: { name, email, phone, message } });

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
        if (adminEmail) {
          const adminHtml = loadEmailTemplate("contact-admin-enquiry.html", emailData);
          adminEmailResponse = await safeSend({
            to: adminEmail,
            subject: "New Contact Enquiry Received",
            html: adminHtml,
          });
        }
      } catch (err) {
        console.error("❌ Admin email lookup/send failed:", err);
      }

      ctx.body = {
        message: "Enquiry submitted successfully",
        data: response,
        email: {
          user: !!userEmailResponse,
          admin: !!adminEmailResponse,
        },
      };
    },
  }),
);