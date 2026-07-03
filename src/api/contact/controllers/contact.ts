/**
 * contact controller
 */

import { factories } from "@strapi/strapi";
import { posix } from "path";

export default factories.createCoreController(
  "api::contact.contact",
  ({ strapi }) => ({
    async find(ctx) {
      const data = await strapi.service("api::contact.contact").find({
        populate: {
          banner_section: {
            populate: {
              media: {
                populate: {
                  desktop_media_path: { fields: ["url"] },
                  mobile_media_path: { fields: ["url"] },
                },
              },
            },
          },

          contcat_information: {
            populate: {
              contact_items: true,
            },
          },

          form_section: true,
        },
      });

      // Transform phone into an array split by comma
      const contactInformation = data?.contcat_information
        ? {
            ...data.contcat_information,
            contact_items: data.contcat_information.contact_items?.map(
              (item) => ({
                ...item,
                phone: item.phone
                  ? item.phone.split(",").map((p) => p.trim())
                  : [],
              }),
            ),
          }
        : null;

      ctx.body = {
        banner_section: data?.banner_section,
        contcat_information: contactInformation,
        form_section: data?.form_section,
      };
    },
  }),
);
