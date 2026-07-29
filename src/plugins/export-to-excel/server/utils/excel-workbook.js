'use strict';

const ExcelJS = require('exceljs');

const EXPORT_PAGE_SIZE = 200;
const EXPORT_MAX_ROWS = 5000; // safety cap against unbounded memory use

function formatCell(value, column) {
  if (value === null || value === undefined) return '';
  if (column.type === 'date') {
    return new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  }
  return value;
}

async function buildWorkbookBuffer(columns, rows) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Wealth Lounge Admin';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Export');
  sheet.columns = columns.map((c) => ({ header: c.header, key: c.key, width: c.width || 20 }));
  sheet.getRow(1).font = { bold: true };

  for (const row of rows) {
    const record = {};
    for (const c of columns) record[c.key] = formatCell(row[c.key], c);
    sheet.addRow(record);
  }

  return workbook.xlsx.writeBuffer();
}

module.exports = { buildWorkbookBuffer, EXPORT_PAGE_SIZE, EXPORT_MAX_ROWS };
