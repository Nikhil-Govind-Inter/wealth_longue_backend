/**
 * profile-assesment controller
 */

import { factories } from "@strapi/strapi";
import { removeMetaFields } from "../../../utils";

export default factories.createCoreController(
  "api::profile-assesment.profile-assesment",
  ({ strapi }) => ({
    async find(ctx) {
      const response = await strapi
        .service("api::profile-assesment.profile-assesment")
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
          },
        });

        ctx.body = removeMetaFields(response);
    },
  }),
);
