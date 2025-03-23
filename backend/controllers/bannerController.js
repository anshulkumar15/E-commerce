import { v2 as cloudinary } from "cloudinary";
import bannerModel from "../models/bannerModel.js";

// Function to add a new banner
export const addBanner = async (req, res) => {
  try {
    const {
      title,
      description,
      buttonText,
      buttonLink,
      isActive,
      order
    } = req.body;
    
    // Check if banner image was uploaded
    if (!req.files || !req.files.image) {
      return res.json({ 
        success: false, 
        message: "Banner image is required" 
      });
    }
    
    const bannerImage = req.files.image[0];
    
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(bannerImage.path, {
      resource_type: "image",
    });
    
    // Create new banner object
    const bannerData = {
      title,
      description,
      buttonText: buttonText || "Shop Now",
      buttonLink: buttonLink || "/shop",
      imageUrl: result.secure_url,
      isActive: isActive === "true" ? true : false,
      order: order ? Number(order) : 1,
      createdAt: Date.now(),
    };
    
    // Save banner to database
    const banner = new bannerModel(bannerData);
    await banner.save();
    
    res.json({ 
      success: true, 
      message: "Banner Added Successfully", 
      banner 
    });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

// Function to get all banners
export const getAllBanners = async (req, res) => {
  try {
    // Get all banners, sorted by order
    const banners = await bannerModel.find({}).sort({ order: 1 });
    res.json({ success: true, banners });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

// Function to get active banners only
export const getActiveBanners = async (req, res) => {
  try {
    // Get only active banners, sorted by order
    const banners = await bannerModel.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, banners });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

// Function to update banner
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // If there's a new image, upload it
    if (req.files && req.files.image) {
      const bannerImage = req.files.image[0];
      const result = await cloudinary.uploader.upload(bannerImage.path, {
        resource_type: "image",
      });
      updateData.imageUrl = result.secure_url;
    }
    
    // Convert boolean string to actual boolean
    if (updateData.isActive !== undefined) {
      updateData.isActive = updateData.isActive === "true" || updateData.isActive === true;
    }
    
    // Convert order to number if present
    if (updateData.order) {
      updateData.order = Number(updateData.order);
    }
    
    const banner = await bannerModel.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!banner) {
      return res.json({ success: false, message: "Banner not found" });
    }
    
    res.json({ success: true, message: "Banner updated successfully", banner });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

// Function to delete banner
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    
    const banner = await bannerModel.findByIdAndDelete(id);
    
    if (!banner) {
      return res.json({ success: false, message: "Banner not found" });
    }
    
    res.json({ success: true, message: "Banner deleted successfully" });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};