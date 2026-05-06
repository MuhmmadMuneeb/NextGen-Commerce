import Stripe from "stripe";
import Order from "../../models/order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_ID);

const paymentRecived = async (req, res) => {
  try {
    const { product } = req.body;
    const userId = req.user.id;
    

    const totalAmount = product.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const order = await Order.create({
      userId,
      products: product,
      totalAmount,
      paymentStatus: "pending",
    });


    const listItems = product.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: listItems, 
      mode: "payment",
      success_url: "http://localhost:5173/shop/success",
      cancel_url: "http://localhost:5173/shop/cancel",
      metadata: {
        orderId: order._id.toString(),
        userId: userId, // ✅ comes from DB-authenticated user
      },
      customer_email: req.user.email,
    });

    if (!session) {
      return res.status(400).json({
        success: false,
        message: "Failed to create Stripe session",
      });
    }

    return res.status(200).json({
      success: true,
      id: session.id,
      url: session.url
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in Stripe",
    });
  }
};

export default paymentRecived;