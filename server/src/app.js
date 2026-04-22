import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "./config/env.js";
import { ensureUploadDir } from "./utils/files.js";
import clothesRoutes from "./routes/clothesRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import outfitRoutes from "./routes/outfitRoutes.js";
import automationRoutes from "./routes/automationRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ensureUploadDir(env.uploadDir);

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve(__dirname, "..", "..", env.uploadDir)));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "digital-closet-api" });
});

app.use("/api/clothes", clothesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/automation", automationRoutes);

app.use(errorHandler);

export default app;

