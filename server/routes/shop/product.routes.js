import { allProducts, productDetails } from "../../controller/shop/product.js";
import express from "express"
const shopProductsRouter = express.Router()

shopProductsRouter.get("/get",allProducts )
shopProductsRouter.get("/getDetails/:id",productDetails )
export default shopProductsRouter