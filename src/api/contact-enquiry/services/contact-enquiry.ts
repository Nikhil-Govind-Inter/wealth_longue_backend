/**
 * contact-enquiry service
 */
import { factories } from "@strapi/strapi";
import { loadEmailTemplate } from "../../../utils/emailHelper";

export default factories.createCoreService(
  "api::contact-enquiry.contact-enquiry",
  ({ strapi }) => ({

    async completeEnquiryForm(data) {
      console.log("💾 Saving enquiry to DB for:", data.email);

      // 1. Save to DB
      const response = await strapi.entityService.create(
        "api::contact-enquiry.contact-enquiry",
        {
          data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
          },
        }
      );

      console.log("✅ DB record created:", response.id);

      // 2. Load HTML template
      const html = loadEmailTemplate("contact-enquiry.html", {
        NAME    : data.name,
        EMAIL   : data.email,
        PHONE   : data.phone || "Not provided",
        MESSAGE : data.message,
        DATE    : new Date().toLocaleDateString("en-IN", { dateStyle: "long" }),
      });

      console.log("📧 Attempting to send email to:", data.email);
      console.log("📧 From:", process.env.SMTP_DEFAULT_FROM || process.env.SMTP_USER);

      // 3. Send email
      try {
        await strapi.plugins["email"].services.email.send({
          to     : data.email,
          from   : process.env.SMTP_DEFAULT_FROM || process.env.SMTP_USER,
          subject: "We've received your enquiry ✅",
          html,
        });

        console.log(`✅ Email sent successfully to: ${data.email}`);

      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError);
      }

      return response;
    },

  })
);