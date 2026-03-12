import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRouter from "./routes/auth/auth.js"
const app = express()

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("connected to db")
}).catch((err) => {
    console.log("not connect to db")
})

const PORt=process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type", "Authorization"]
}))

app.use("api/auth",authRouter)
app.listen(PORt, () => {
    console.log(`server is running on http://localhost:${PORt}`)
})
