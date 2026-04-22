import { getSummary } from "../services/closetService.js";
import { getWeatherSnapshot } from "../services/weatherService.js";
import { inferSeasonFromTemperature } from "../utils/outfitLogic.js";

export async function getDashboardSummary(req, res, next) {
  try {
    const [summary, weather] = await Promise.all([
      getSummary(),
      getWeatherSnapshot(req.query.latitude, req.query.longitude)
    ]);

    res.json({
      ...summary,
      currentSeason: inferSeasonFromTemperature(weather.temperature),
      weather
    });
  } catch (error) {
    next(error);
  }
}
