import express from "express";
import { checkAuthMiddleware } from "../../controller/auth.controller.js";
import paymentRecived from "../../controller/stripe/stripe.controller.js"


const router = express.Router();
router.post("/payment", checkAuthMiddleware, paymentRecived);

export default router;