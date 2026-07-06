/**
 * profile-assesment-enquiry controller
 */

import { factories } from "@strapi/strapi";
import { loadEmailTemplate } from "../../../utils/emailHelper";
import { sendEmail } from "../../../utils/emailService";
import { verifyRecaptcha } from "../../../utils/recaptcha";

export default factories.createCoreController(
  "api::profile-assesment-enquiry.profile-assesment-enquiry",
  ({ strapi }) => ({
    async create(ctx) {
      // ✅ FIX: read from ctx.request.body, NOT ctx.body
      const formData = ctx.request.body?.data;

      if (!formData || !formData.email) {
        return ctx.badRequest("Missing required enquiry data");
      }

      const {
        fullName,
        email,
        phone,
        age,
        occupation,
        riskComfort,
        investedBefore,
        investmentExperience,
        investmentProducts,
        productInterest,
        readyToInvest,
        maximumPeriod,
        annualIncome,
        communication,
        mostConvenient,
        additionalDetails,
        captchaToken,
      } = formData;

      if (!captchaToken) {
        return ctx.badRequest("Captcha token is missing.");
      }

      const verified = await verifyRecaptcha(captchaToken);
      if (!verified) {
        return ctx.badRequest("Captcha verification failed.");
      }

      // Remove captchaToken so we don't save it to the DB schema
      const { captchaToken: _, ...dbData } = formData;

      // find email from db
      const existingEmail = await strapi
        .documents("api::profile-assesment-enquiry.profile-assesment-enquiry")
        .findFirst({
          filters: { email },
        });

      if (existingEmail) {
        return ctx.badRequest(
          "You have already submitted an enquiry with this email.",
        );
      }

      // ✅ FIX: wrap DB write in try/catch
      let response;
      try {
        response = await strapi
          .documents("api::profile-assesment-enquiry.profile-assesment-enquiry")
          .create({ data: dbData });
      } catch (dbError) {
        strapi.log.error("❌ Failed to save enquiry:", dbError);
        return ctx.internalServerError(
          "Failed to save your enquiry. Please try again.",
        );
      }

      // ✅ FIX: use actual form fields, not name/message
      const html = loadEmailTemplate("profile-assessment-enquiry.html", {
        NAME: fullName,
        EMAIL: email,
        PHONE: phone || "Not provided",
        AGE: age || "Not provided",
        OCCUPATION: occupation || "Not provided",
        RISK_COMFORT: riskComfort || "Not provided",
        INVESTED_BEFORE: investedBefore || "Not provided",
        INVESTMENT_EXPERIENCE: investmentExperience || "Not provided",
        INVESTMENT_PRODUCTS: investmentProducts || "Not provided",
        PRODUCT_INTEREST: productInterest || "Not provided",
        READY_TO_INVEST: readyToInvest || "Not provided",
        MAXIMUM_PERIOD: maximumPeriod || "Not provided",
        ANNUAL_INCOME: annualIncome || "Not provided",
        COMMUNICATION: communication || "Not provided",
        MOST_CONVENIENT: mostConvenient || "Not provided",
        ADDITIONAL_DETAILS: additionalDetails || "None",
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
        // Still return success since the enquiry WAS saved — email is secondary
        ctx.body = {
          message: "Enquiry saved but email failed",
          data: response,
        };
      }
    },
  }),
);
