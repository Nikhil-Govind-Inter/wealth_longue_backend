import { factories } from "@strapi/strapi";
import { removeMetaFields } from "../../../utils";

const PAGE_SIZE = 9;
const RECENT_NEWS_LIMIT = 5;

export default factories.createCoreController(
  "api::news-and-blog.news-and-blog",
  ({ strapi }) => ({
    async find(ctx) {
      const { category, page = 1 } = ctx.query;

      const { results } = await strapi
        .service("api::news-and-blog.news-and-blog")
        .find({
          filters: category
            ? {
                category: {
                  slug: { $eq: category },
                },
              }
            : {},
          fields: ["title", "published_on", "slug", "excerpt"],
          populate: {
            category: {
              fields: ["name", "slug"],
            },
            media: {
              populate: {
                media_path: { fields: ["url", "alternativeText"] },
              },
            },
          },
        });

      const cleanResponse = removeMetaFields(results);

      // Extract count from fetched news_and_blogs
      const total = cleanResponse?.length ?? 0;

      // Manual pagination slice
      const start = (Number(page) - 1) * PAGE_SIZE;
      const paginatedNews = cleanResponse?.slice(start, start + PAGE_SIZE);

      ctx.body = {
        data: paginatedNews,
        pagination: {
          page: Number(page),
          pageSize: PAGE_SIZE,
          pageCount: Math.ceil(total / PAGE_SIZE),
          total,
        },
      };
    },

    async findOne(ctx) {
      const { slug } = ctx.params;

      // Fetch the main entry by slug
      const { results: mainResults } = await strapi
        .service("api::news-and-blog.news-and-blog")
        .find({
          filters: { slug: { $eq: slug } },
          populate: {
            category: { fields: ["name", "slug"] },
            media: {
              populate: {
                media_path: { fields: ["url", "alternativeText"] },
              },
            },
          },
        });

      const entry = mainResults?.[0];

      if (!entry) {
        return ctx.notFound("News/Blog entry not found");
      }
      ctx.body = {
        data: removeMetaFields(entry),
      };
    },
  }),
);
