const { Client } = require('pg');

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://USER:PASSWORD@HOST:PORT/DBNAME',
  });
  await client.connect();

  const table = 'components_testimonial_component_testimonial_sections';

  const { rows } = await client.query(`SELECT id, description FROM public.${table}`);

  for (const row of rows) {
    let text = row.description;

    // description is currently a JSON string (e.g. "\"Some text\"") — parse it back to plain text
    try {
      text = JSON.parse(text);
    } catch (e) {
      // already plain text, leave as-is
    }

    if (typeof text !== 'string') continue;

    const paragraphs = text
      .split(/\n\s*\n/) // split on blank lines
      .map((p) => p.trim())
      .filter(Boolean);

    const blocks = paragraphs.map((p) => ({
      type: 'paragraph',
      children: [{ type: 'text', text: p }],
    }));

    await client.query(
      `UPDATE public.${table} SET description = $1::jsonb WHERE id = $2`,
      [JSON.stringify(blocks), row.id]
    );

    console.log(`Updated row ${row.id}`);
  }

  await client.end();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});