import { removeMetaFields } from "./../../../utils";
/**
 * site-setting controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::site-setting.site-setting",
  ({ strapi }) => ({
    async find(ctx) {
      const response = await strapi
        .service("api::site-setting.site-setting")
        .find({
          populate: {
            Header: {
              populate: {
                media: {
                  populate: {
                    media_path: {
                      fields: ["url"],
                    },
                  },
                },
                nav_links: true,
              },
            },
            Footer: {
              populate: {
                media: {
                  populate: {
                    media_path: {
                      fields: ["url"],
                    },
                  },
                },
                navigations: {
                  populate: {
                    navigation_links: true,
                  },
                },
                office_location: {
                  populate: {
                    office_items: {
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
                social_media: {
                  populate: {
                    items: {
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
            },

            widgets: {
              populate: {
                icon: {
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
