import { env } from "../config/env.js";

export async function getWeatherSnapshot(latitude = env.defaultLatitude, longitude = env.defaultLongitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,weather_code",
    timezone: "auto"
  });

  const response = await fetch(`${env.weatherApiUrl}?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Hava durumu servisine şu anda ulaşılamıyor.");
  }

  const data = await response.json();

  return {
    temperature: data.current?.temperature_2m ?? 20,
    weatherCode: data.current?.weather_code ?? 0
  };
}
