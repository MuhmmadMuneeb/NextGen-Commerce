// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    products: [
        {
            productId: String,
            title: String,
            price: Number,
            quantity: Number,
            image: String,
        },
    ],
    totalAmount: Number,
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
    stripeSessionId: String,
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;