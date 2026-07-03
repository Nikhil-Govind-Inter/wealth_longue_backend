/**
 * testimonial controller
 */

import { factories } from "@strapi/strapi";
import { removeMetaFields } from "../../../utils";

export default factories.createCoreController(
  "api::testimonial.testimonial",
  ({ strapi }) => ({
    async find(ctx) {
      const response = await strapi
        .service("api::testimonial.testimonial")
        .find({
          populate: {
            banner_section: {
              populate: {
                media: {
                  populate: {
                    desktop_media_path: {
                      fields: ["url"],
                    },
                    mobile_media_path: {
                      fields: ["url"],
                    },
                  },
                },
              },
            },

            about_section: {
              populate: {
                media_path: {
                  fields: ["url"],
                },
              },
            },

            testimonial_section: {
              populate: {
                testimonial_items: {
                  populate: {
                    media: {
                      populate: {
                        media_path: {
                          fields: ["url"],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });

      ctx.body = removeMetaFields(response);
    },
  }),
);
