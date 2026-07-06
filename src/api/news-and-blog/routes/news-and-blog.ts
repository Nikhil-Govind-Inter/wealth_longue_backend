import path from "path";

export default {
  routes: [
    {
      method: "GET",
      path: "/news-and-blogs",
      handler: "news-and-blog.find",
    },
    {
      method: "GET",
      path: "/news-and-blogs/:slug",
      handler: "news-and-blog.findOne",
    },
  ],
};