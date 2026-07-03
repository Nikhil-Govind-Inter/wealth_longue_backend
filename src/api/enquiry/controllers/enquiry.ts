/**
 * enquiry controller
 */

import { factories } from '@strapi/strapi';
import { sendEmail } from '../../../utils/emailService';
import { loadEmailTemplate } from '../../../utils/emailHelper';

export default factories.createCoreController('api::enquiry.enquiry',

      ({ strapi }) => ({
        async create(ctx) {
          const { name, email, phone, message } = ctx.request.body;
    
          const response = await strapi.documents("api::contact-enquiry.contact-enquiry").create({
            data: { name, email, phone, message },
          });

          console.log("email from frontend : ", email)
    
          const html = loadEmailTemplate("contact-enquiry.html", {
            NAME: name,
            EMAIL: email,
            PHONE: phone || "Not provided",
            MESSAGE: message,
            DATE: new Date().toLocaleDateString("en-IN", { dateStyle: "long" }),
          });
    
          try {
            const emailResponse = await sendEmail({
              to: email,
              
              subject: "Thanks for contacting Wealth Lounge!",
              html,
            });
    
            console.log(`✅ Email sent to: ${email}`);
            ctx.body = { message: "Enquiry submitted successfully", data: response, emailResponse };
          } catch (emailError) {
            console.error("❌ Email sending failed:", emailError);
            ctx.body = { message: "Enquiry saved but email failed", data: response };
          }
        },
      }),
);
