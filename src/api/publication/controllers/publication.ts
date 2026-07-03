import { factories } from "@strapi/strapi";
import { removeMetaFields } from "../../../utils";

/**
 * publication controller
 */

export default factories.createCoreController(
  "api::publication.publication",
  ({ strapi }) => ({
    async find(ctx) {
      const response = await strapi
        .service("api::publication.publication")
        .find({
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
          },
        });

      const cleanResponse = removeMetaFields(response);

      ctx.body = cleanResponse;
    },
  }),
);
