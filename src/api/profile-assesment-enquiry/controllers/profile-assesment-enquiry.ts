/**
 * profile-assesment-enquiry controller
 */

import { factories } from "@strapi/strapi";
import { loadEmailTemplate, safeSend } from "../../../utils/emailHelper";
import { verifyRecaptcha } from "../../../utils/recaptcha";
import { getAdminEmail } from "../../../utils/siteSettings";

export default factories.createCoreController(
  "api::profile-assesment-enquiry.profile-assesment-enquiry",
  ({ strapi }) => ({
    async create(ctx) {
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

      const { captchaToken: _, ...dbData } = formData;

      const documents = strapi.documents(
        "api::profile-assesment-enquiry.profile-assesment-enquiry",
      );

      const existingEmail = await documents.findFirst({ filters: { email } });
      if (existingEmail) {
        return ctx.badRequest(
          "You have already submitted an enquiry with this email.",
        );
      }

      let response;
      try {
        response = await documents.create({ data: dbData });
      } catch (dbError) {
        strapi.log.error("❌ Failed to save enquiry:", dbError);
        return ctx.internalServerError(
          "Failed to save your enquiry. Please try again.",
        );
      }

      const emailData = {
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
      };

      const userHtml = loadEmailTemplate("profile-assessment-enquiry.html", emailData);
      const userEmailResponse = await safeSend({
        to: email,
        subject: "Thanks for contacting Wealth Lounge!",
        html: userHtml,
      });

      let adminEmailResponse = null;
      try {
        const adminEmail = await getAdminEmail(strapi);
        if (adminEmail) {
          const adminHtml = loadEmailTemplate(
            "profile-assessment-enquiry.html",
            emailData,
          );
          adminEmailResponse = await safeSend({
            to: adminEmail,
            subject: "New Profile Assessment Enquiry Received",
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
