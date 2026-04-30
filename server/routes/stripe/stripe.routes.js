import paymentRecived from "../../controller/stripe/stripe.controller.js"
import express from "express"
 const router = express.Router()
router.post("/stripe",paymentRecived)
export default router
