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
              button: true,
            },
          },

          service_section: {
            populate: {
              button: true,
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
            populate: {
              button: true,
              news_items: {
                populate: {
                  media: {
                    populate: {
                      media_path: {
                        fields: ["url"],
                      },
                    },
                  },
                  category:{
                    fields: ["name"]
                  }
                },
              },
            },
          },
        },
      });

      console.log("MESSAGE SEND SUCCESS!!!!!!")
      ctx.body = removeMetaFields(data);
    },
  }),
);
