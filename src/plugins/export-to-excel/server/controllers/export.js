'use strict';

const CONTENT_TYPES = require('../content-types-config');
const { buildWorkbookBuffer, EXPORT_PAGE_SIZE, EXPORT_MAX_ROWS } = require('../utils/excel-workbook');

module.exports = ({ strapi }) => ({
  async exportToExcel(ctx) {
    const { model } = ctx.params;
    const contentTypeConfig = CONTENT_TYPES[model];
    if (!contentTypeConfig) {
      return ctx.notFound(`Export is not supported for content type "${model}".`);
    }

    const { filters, sort, _q } = ctx.query;

    const documents = strapi.documents(model);
    const rows = [];
    let page = 1;
    while (rows.length < EXPORT_MAX_ROWS) {
      const batch = await documents.findMany({
        page,
        pageSize: EXPORT_PAGE_SIZE,
        sort: sort || { createdAt: 'desc' },
        ...(filters ? { filters } : {}),
        ...(_q ? { _q } : {}),
      });
      if (!batch.length) break;
      rows.push(...batch);
      if (batch.length < EXPORT_PAGE_SIZE) break;
      page += 1;
    }

    const buffer = await buildWorkbookBuffer(contentTypeConfig.columns, rows.slice(0, EXPORT_MAX_ROWS));
    const timestamp = new Date().toISOString().slice(0, 10);

    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    ctx.set('Content-Disposition', `attachment; filename="${contentTypeConfig.fileBaseName}-${timestamp}.xlsx"`);
    ctx.body = buffer;
  },
});
