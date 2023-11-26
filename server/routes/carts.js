import express from "express";
import {
  postCart,
  getCart,
  deleteCart,
  updateCart,
} from "../controllers/carts.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/",verifyToken, getCart);
router.post("/addCart", verifyToken, postCart);
router.delete("/deleteProductCart/:productId", verifyToken, deleteCart);
router.put("/updateCart/", verifyToken, updateCart);

export default router;
