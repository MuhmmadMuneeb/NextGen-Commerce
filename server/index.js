import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRouter from "./routes/auth/auth.js"
import dotenv from "dotenv"
import ProductRouter from "./routes/admin/products-auth.js"
import shopProductsRouter from "./routes/shop/product.routes.js"
import cartRouter from "./routes/shop/cart.routes.js"
import contactRouter from "./routes/contact/contact.routes.js"
import { connectDB } from "./config/connectdb.js"
import sliderAndPopupRoutes from "./routes/sliderandpopup/slide.routes.js"
dotenv.config()
const app = express()

//dotenv config
const PORt=process.env.PORT || 3000
// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type", "Authorization"]
}))
// database connection
connectDB()

// Routes
app.use("/api/auth",authRouter)
app.use("/api/admin/products",ProductRouter)
app.use("/api/shop/products",shopProductsRouter)
app.use("/api/shop/cart",cartRouter)
app.use("/api/sendmail", contactRouter);
app.use("/api/slider-popup", sliderAndPopupRoutes);

// Start the server
app.listen(PORt, () => {
    console.log(`server is running on http://localhost:${PORt}`)
})
