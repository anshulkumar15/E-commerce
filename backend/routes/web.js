import express from "express";
 import {
  userProfile,updateUserProfile,fetchUsers,deleteUsers
  } from "../controllers/userController.js";
import { fetchUsersOrders } from "../controllers/orderController.js";


const router = express.Router();


router.get("/api/user/profile",userProfile);
router.put("/api/user/profile",updateUserProfile);
router.get("/api/fetch/users",fetchUsers);
router.delete("/api/user/delete/:userId",deleteUsers);
router.get("/api/user/:userId/orders",fetchUsersOrders);

export default router;