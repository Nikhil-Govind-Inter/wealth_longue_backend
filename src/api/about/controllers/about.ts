/**
 * about controller
 */

import { factories } from "@strapi/strapi";
import { removeMetaFields } from "../../../utils";

export default factories.createCoreController(
  "api::about.about",
  ({ strapi }) => ({
    async find(ctx) {
      const response = await strapi.service("api::about.about").find({
        populate: {
          about_banner: {
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

          mission_vission_section: true,

          about_core_section: {
            populate: {
              core_values: {
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

          team_section: {
            populate: {
              teams: {
                populate: {
                  profile: {
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

          advisory_board_section: {
            populate: {
              teams: {
                populate: {
                  profile: {
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
