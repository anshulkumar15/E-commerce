import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
  razorpayStoreData,
  verifyplaceOrderRazorpay
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//ADMIN FEATURE
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//PAYMENT FEATURE
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);


//USER FEATURE
orderRouter.post("/userorders", authUser, userOrders);

//VERIFY PAYMENT
orderRouter.post("/verifystripe", authUser, verifyStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);
orderRouter.post("/razorpay/verify", authUser, verifyplaceOrderRazorpay);
orderRouter.post("/razorpay/storeData", authUser, razorpayStoreData);

export default orderRouter;
