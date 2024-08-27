import express from "express";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getGig,
} from "../controllers/gig.controller.js";
import protect from "../middlewares/protect.js";

// 1) router oluştur
const router = express.Router();

// 2) yolları tanımla
router.get("/", getAllGigs);
router.get("/:id", getGig);
router.post("/", protect, createGig);
router.delete("/:id", protect, deleteGig);

// 3) export et ve server.js'e tanıt
export default router;
