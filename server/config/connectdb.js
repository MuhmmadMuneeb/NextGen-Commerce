import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL).then(() => {
            console.log("connected to db")
        }).catch((err) => {
            console.log("not connect to db")
        })

    } catch (error) {
        console.error("Error connecting to DB:", error);
    }
}