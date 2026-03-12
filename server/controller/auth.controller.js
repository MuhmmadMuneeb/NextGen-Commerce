import User from "../models/user.model.js";
import bycrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { userName, password, email, role } = req.body
        const hashedPassword = await bycrypt.hash(password, 10)
        const user = await User.create({ userName, password: hashedPassword, email, role })
        await user.save()
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const Login = async (req, res) => {
    try {
        
        const { userName, password, role } = req.body
        const hashedPassword = await bycrypt.compare(password, )
        const user = await User.create({ userName, password: hashedPassword, email, role })
        await user.save()

    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const Logout = async (req, res) => {
    try {

        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

