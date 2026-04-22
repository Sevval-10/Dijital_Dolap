import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  databaseUrl:
    process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/digital_closet",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-1.5-flash",
  weatherApiUrl: process.env.WEATHER_API_URL || "https://api.open-meteo.com/v1/forecast",
  defaultLatitude: Number(process.env.DEFAULT_LATITUDE || 41.0082),
  defaultLongitude: Number(process.env.DEFAULT_LONGITUDE || 28.9784),
  uploadDir: process.env.UPLOAD_DIR || "server/uploads",
  n8nSharedSecret: process.env.N8N_SHARED_SECRET || "change_me"
};

