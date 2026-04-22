CREATE TABLE IF NOT EXISTS clothes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(80) NOT NULL,
  color VARCHAR(80) NOT NULL,
  season VARCHAR(40) NOT NULL,
  occasion VARCHAR(80) NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS outfits (
  id SERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  notes TEXT,
  weather_label VARCHAR(80),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS outfit_items (
  id SERIAL PRIMARY KEY,
  outfit_id INTEGER REFERENCES outfits(id) ON DELETE CASCADE,
  clothing_id INTEGER REFERENCES clothes(id) ON DELETE CASCADE
);

INSERT INTO clothes (name, category, color, season, occasion, image_url, tags)
VALUES
  ('White Basic T-Shirt', 'Top', 'White', 'Spring', 'Casual', NULL, ARRAY['minimal', 'daily']),
  ('Blue Denim Jacket', 'Outerwear', 'Blue', 'Spring', 'Casual', NULL, ARRAY['layered']),
  ('Black Slim Jeans', 'Bottom', 'Black', 'All Season', 'Casual', NULL, ARRAY['city']),
  ('Beige Chino Pants', 'Bottom', 'Beige', 'Summer', 'Office', NULL, ARRAY['smart']),
  ('White Sneakers', 'Shoes', 'White', 'All Season', 'Casual', NULL, ARRAY['comfortable']);

