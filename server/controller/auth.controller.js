import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const register = async (req, res) => {
    try {
        const { userName, password, email, role } = req.body
        if (!userName || !password || !email) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ userName, password: hashedPassword, email, role })
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { id: user._id, userName: user.userName, email: user.email }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password || !email) {
            return res.status(400).json({ success: false, message: "All fields are required and must be valid" })
        }
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json("Wrong password");

        const secret = process.env.JWT_SECRET
        if (!secret) return res.status(500).json("JWT secret not found");
        const token = jwt.sign(
            { id: user._id, role: user.role },
            secret,
            { expiresIn: "1d" }
        );

        return res.cookie("token", token, {
            httpOnly: true,
        }).status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
        });

    } catch (error) {

        console.error("Login Error:", error);
        return res.status(401).json({
            success: false,
            message: "login failed"
        })
    }
};

export const Logout = async (req, res) => {
    try {
        return res
            .clearCookie("token")
            .status(200)
            .json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const checkAuthMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
}
