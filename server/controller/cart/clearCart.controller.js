import Cart from "../../models/Cart.js";
import Order from "../../models/order.js";


export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        await Cart.findOneAndUpdate(
            { userId },
            { $set: { items: [] } }
        );
        await Order.findOneAndUpdate(
            { userId, paymentStatus: "pending" },
            { $set: { paymentStatus: "paid" } },
            { sort: { createdAt: -1 } } // latest order first
        );
        return res.status(200).json({ success: true, message: "Cart cleared" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error clearing cart" });
    }
};