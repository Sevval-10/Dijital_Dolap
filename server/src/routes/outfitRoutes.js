import { Router } from "express";
import { getOutfitRecommendation } from "../controllers/outfitController.js";

const router = Router();

router.get("/recommendation", getOutfitRecommendation);

export default router;

