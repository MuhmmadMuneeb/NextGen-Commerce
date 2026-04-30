import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_ID);

const paymentRecived = async (req, res) => {
  try {
    const { product } = req.body;

    const listItems = product.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100, // ✅ convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: listItems, // ✅ no extra []
      mode: "payment",
      success_url: "http://localhost:5173/shop/success",
      cancel_url: "http://localhost:5173/shop/cancel",
    });

    console.log(session)
    if (!session) {
      return res.status(400).json({
        success: false,
        message: "Failed to create Stripe session",
        url:session.url
      });
    }

    return res.status(200).json({
      success: true,
      id: session.id, // ✅ frontend expects this
      url:session.url
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