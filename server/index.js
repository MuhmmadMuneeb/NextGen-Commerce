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
import sliderRoutes from "./routes/sliderandpopup/slide.routes.js"
import popupRoutes from "./routes/popup/popup.routes.js"
dotenv.config()
const app = express()

//dotenv config
const PORt = process.env.PORT || 3000
// Middleware
app.use(express.json())
app.use(cookieParser())
// Locate your app.use(cors(...)) and update it to this:
app.use(
    cors({
        origin: "http://localhost:5173", // Your frontend URL
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], // Explicitly allow PATCH and PUT
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    })
);
// database connection
connectDB()

// Routes
app.use("/api/auth", authRouter)
app.use("/api/admin/products", ProductRouter)
app.use("/api/shop/products", shopProductsRouter)
app.use("/api/shop/cart", cartRouter)
app.use("/api/sendmail", contactRouter);
app.use("/api/slider", sliderRoutes);
app.use("/api/popup", popupRoutes);

// Start the server
app.listen(PORt, () => {
    console.log(`server is running on http://localhost:${PORt}`)
})
