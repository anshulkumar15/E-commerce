import express from "express";
 import {
    addBanner
  } from "../controllers/productController.js";

const router = express.Router();


router.post("/api/banner/add",addBanner);

export default router;