import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRouter from "./routes/auth/auth.js"
import dotenv from "dotenv"
dotenv.config()
const app = express()



const PORt=process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type", "Authorization"]
}))

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("connected to db")
}).catch((err) => {
    console.log("not connect to db")
})

app.use("/api/auth",authRouter)
app.listen(PORt, () => {
    console.log(`server is running on http://localhost:${PORt}`)
})
