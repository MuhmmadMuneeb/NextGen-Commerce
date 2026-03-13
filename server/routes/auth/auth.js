import express from "express"
import { checkAuthMiddleware, Login, Logout, register } from "../../controller/auth.controller.js"
const authRouter = express.Router()

authRouter.post('/login', Login)
authRouter.post('/register', register)
authRouter.post('/logout', Logout)
authRouter.get('/check-auth', checkAuthMiddleware, (req, res) => {
    const user = req.user
    res.status(200).json({ success: true, message: "User is authenticated", user })
})
export default authRouter