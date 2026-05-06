import express from "express";
import { addToCart, deleteCartItem, fetchCartItems, updateCartItemQty } from "../../controller/cart/Cart.controller.js";
import { clearCart } from "../../controller/cart/clearCart.controller.js";
import { checkAuthMiddleware } from "../../controller/auth.controller.js";
const router = express.Router();



router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/delete", deleteCartItem);
router.delete("/clear", checkAuthMiddleware, clearCart);

export default router;
