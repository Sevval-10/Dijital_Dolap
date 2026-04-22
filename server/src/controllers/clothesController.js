import { createClothingItem, deleteClothingItem, listClothes } from "../services/closetService.js";

export async function getClothes(_req, res, next) {
  try {
    const items = await listClothes();
    res.json(items);
  } catch (error) {
    next(error);
  }
}

export async function postClothing(req, res, next) {
  try {
    const payload = {
      ...req.body,
      tags: req.body.tags ? req.body.tags.split(",").map((tag) => tag.trim()) : []
    };

    const item = await createClothingItem(payload);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

export async function uploadClothingImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Herhangi bir dosya yüklenmedi." });
    }

    res.status(201).json({
      fileName: req.file.filename,
      imageUrl: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    next(error);
  }
}

export async function removeClothing(req, res, next) {
  try {
    const deletedItem = await deleteClothingItem(Number(req.params.id));

    if (!deletedItem) {
      return res.status(404).json({ message: "Silinecek kıyafet bulunamadı." });
    }

    res.json({ message: "Kıyafet başarıyla silindi.", item: deletedItem });
  } catch (error) {
    next(error);
  }
}
