/**
 * alternative-approach controller
 */

import { factories } from "@strapi/strapi";
import { removeMetaFields } from "../../../utils";

export default factories.createCoreController(
  "api::alternative-approach.alternative-approach",
  ({ strapi }) => ({
    async find(ctx) {
      const response = await strapi
        .service("api::alternative-approach.alternative-approach")
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

            about_approach: {
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

            alternative_types: {
              populate: {
                enquire_button: {
                  fields: ["link", "label", "is_external"],
                },
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
        });
      ctx.body = removeMetaFields(response);
    },
  }),
);
