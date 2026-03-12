import express from "express"
import { Login, Logout, register } from "../../controller/auth.controller.js"
const authRouter = express.Router()

authRouter.post('/login', Login)
authRouter.post('/register', register)
authRouter.post('/logout', Logout)
export default authRouter