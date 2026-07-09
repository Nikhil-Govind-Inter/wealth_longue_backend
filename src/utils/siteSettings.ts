import type { Core } from "@strapi/strapi";

export async function getAdminEmail(strapi: Core.Strapi) {
  const siteSettings = await strapi
    .documents("api::site-setting.site-setting") // adjust UID to match yours
    .findFirst({
      fields: ["admin_email"], // adjust field name to match your schema
    });
    
    return siteSettings?.admin_email;
}
