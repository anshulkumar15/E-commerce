import express from "express";
import  adminAuth  from "../middleware/adminAuth.js";
import { 
  addBanner, 
  getAllBanners, 
  getActiveBanners, 
  updateBanner, 
  deleteBanner 
} from "../controllers/bannerController.js";
import upload from "../middleware/multer.js"; // Assuming you have this for file uploads

const router = express.Router();

// Admin routes (protected)
router.post("/add", adminAuth, upload.fields([{ name: "image", maxCount: 1 }]), addBanner);
router.get("/all", getAllBanners);
router.patch("/update/:id", adminAuth, upload.fields([{ name: "image", maxCount: 1 }]), updateBanner);
router.delete("/delete/:id", adminAuth, deleteBanner);

// Public route for frontend
router.get("/active", getActiveBanners);

export default router;