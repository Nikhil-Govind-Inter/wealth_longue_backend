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
                login_button: true,
              },
            },
            footer: {
              populate: {
                footer_logo: {
                  populate: {
                    fields: ["url"],
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
                        media_path: {
                          populate: {
                            fields: ["url"],
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
                        media_path: {
                          populate: {
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
        });

      ctx.body = {
        header: {
          header: response.Header,
          footer: response.footer,
        },
      };
    },
  }),
);
