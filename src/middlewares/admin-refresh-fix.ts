export default () => {
  return async (ctx, next) => {
    if (
      ctx.method === "GET" &&
      ctx.path.startsWith("/admin/") &&
      ctx.path.includes("::")
    ) {
      ctx.path = "/admin";
    }

    await next();
  };
};
