const seasonalMap = {
  Winter: ["Winter", "All Season"],
  Spring: ["Spring", "All Season"],
  Summer: ["Summer", "All Season"],
  Autumn: ["Autumn", "All Season"]
};

const colorCompatibility = {
  Black: ["White", "Gray", "Blue", "Beige"],
  White: ["Black", "Blue", "Green", "Beige"],
  Blue: ["White", "Black", "Gray", "Beige"],
  Beige: ["White", "Black", "Brown", "Blue"],
  Green: ["White", "Black", "Beige"]
};

export function inferSeasonFromTemperature(temperature) {
  if (temperature <= 8) return "Winter";
  if (temperature <= 18) return "Spring";
  if (temperature <= 26) return "Autumn";
  return "Summer";
}

export function scoreClothingItem(item, { occasion, season, anchorColor }) {
  let score = 0;

  if (item.occasion.toLowerCase() === occasion.toLowerCase()) score += 3;
  if ((seasonalMap[season] || []).includes(item.season)) score += 3;
  if ((colorCompatibility[anchorColor] || []).includes(item.color)) score += 2;
  if (item.color === anchorColor) score += 1;

  return score;
}

export function buildRuleBasedOutfit(items, context) {
  if (!items.length) return [];

  const anchorColor = items[0].color;
  const ranked = [...items]
    .map((item) => ({
      ...item,
      score: scoreClothingItem(item, { ...context, anchorColor })
    }))
    .sort((a, b) => b.score - a.score);

  const usedCategories = new Set();

  return ranked.filter((item) => {
    if (usedCategories.has(item.category)) return false;
    usedCategories.add(item.category);
    return true;
  });
}

