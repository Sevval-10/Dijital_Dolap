import { Router } from "express";
import { getClothes, postClothing, removeClothing, uploadClothingImage } from "../controllers/clothesController.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/", getClothes);
router.post("/", postClothing);
router.delete("/:id", removeClothing);
router.post("/upload", upload.single("image"), uploadClothingImage);

export default router;
