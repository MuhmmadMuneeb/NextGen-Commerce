import { allProducts } from "../../controller/shop/product.js";
import express from "express"
const shopProductsRouter = express.Router()

shopProductsRouter.get("/get",allProducts )
export default shopProductsRouter