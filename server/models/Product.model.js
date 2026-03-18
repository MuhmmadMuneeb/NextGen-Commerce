import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    totalStock: { type: Number, required: true },
    averageReview: { type: Number, default: 0 },
});

const Product = mongoose.model("Product", productSchema)
export default Product