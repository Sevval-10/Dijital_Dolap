import { listClothes } from "../services/closetService.js";
import { getWeatherSnapshot } from "../services/weatherService.js";
import { buildRuleBasedOutfit, inferSeasonFromTemperature } from "../utils/outfitLogic.js";
import { generateGeminiRecommendation } from "../services/geminiService.js";

export async function getOutfitRecommendation(req, res, next) {
  try {
    const occasion = req.query.occasion || "Casual";
    const items = await listClothes();
    const weather = await getWeatherSnapshot(req.query.latitude, req.query.longitude);
    const season = inferSeasonFromTemperature(weather.temperature);
    const outfit = buildRuleBasedOutfit(items, { occasion, season });
    let ai;

    try {
      ai = await generateGeminiRecommendation({ items: outfit, weather, occasion });
    } catch (geminiError) {
      console.warn("Gemini recommendation fallback:", geminiError.message);
      ai = {
        summary:
          "Yapay zeka açıklaması şu anda kullanılamıyor. Bu nedenle öneri kural tabanlı eşleştirme ile üretildi.",
        bullets: [
          "Kombin; kategori, mevsim, kullanım amacı ve renk uyumuna göre seçildi.",
          "Gemini servisi kullanılamasa bile uygulamayı kullanmaya devam edebilirsiniz."
        ]
      };
    }

    res.json({
      context: {
        occasion,
        season,
        weather
      },
      outfit,
      ai
    });
  } catch (error) {
    next(error);
  }
}
