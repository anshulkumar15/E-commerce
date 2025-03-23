import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    default: "Shop Now"
  },
  buttonLink: {
    type: String,
    default: "/shop"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Banner", bannerSchema);