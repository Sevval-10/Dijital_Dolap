import { query } from "../config/db.js";

export async function listClothes() {
  const result = await query("SELECT * FROM clothes ORDER BY created_at DESC");
  return result.rows;
}

export async function createClothingItem(item) {
  const result = await query(
    `INSERT INTO clothes (name, category, color, season, occasion, image_url, tags)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      item.name,
      item.category,
      item.color,
      item.season,
      item.occasion,
      item.imageUrl || null,
      item.tags || []
    ]
  );

  return result.rows[0];
}

export async function deleteClothingItem(id) {
  const result = await query("DELETE FROM clothes WHERE id = $1 RETURNING *", [id]);
  return result.rows[0] || null;
}

export async function getSummary() {
  const [itemsByCategory, itemsBySeason, totalItems] = await Promise.all([
    query("SELECT category, COUNT(*)::int AS count FROM clothes GROUP BY category ORDER BY count DESC"),
    query("SELECT season, COUNT(*)::int AS count FROM clothes GROUP BY season ORDER BY count DESC"),
    query("SELECT COUNT(*)::int AS count FROM clothes")
  ]);

  return {
    totalItems: totalItems.rows[0]?.count || 0,
    categories: itemsByCategory.rows,
    seasons: itemsBySeason.rows
  };
}
