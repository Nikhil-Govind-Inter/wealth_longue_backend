/**
 * home controller
 */

import { factories } from "@strapi/strapi";
import { link } from "fs";
import { removeMetaFields } from "../../../utils";

export default factories.createCoreController(
  "api::home.home",
  ({ strapi }) => ({
    async find(ctx) {
      const data = await strapi.service("api::home.home").find({
        populate: {
          home_banner: {
            populate: {
              button: true,
              media: {
                populate: {
                  media_desktop_path: {
                    fields: ["url"],
                  },
                  media_mobile_path: {
                    fields: ["url"],
                  },
                  video: {
                    fields: ["url"],
                  },
                },
              },
            },
          },
          about_section: {
            populate: {
              media: {
                populate: {
                  media_path: {
                    fields: ["url"],
                  },
                },
              },
              spec_items: true,
            },
          },
          service_section: {
            populate: {
              service_items: {
                populate: {
                  icons: {
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
          news_and_blogs: {
            fields: ["title", "content", "published_on", "slug"],
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

      ctx.body = removeMetaFields(data);
    },
  }),
);
