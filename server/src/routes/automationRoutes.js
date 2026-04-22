import { Router } from "express";
import { handleN8nWebhook } from "../controllers/automationController.js";

const router = Router();

router.post("/n8n/webhook", handleN8nWebhook);

export default router;

