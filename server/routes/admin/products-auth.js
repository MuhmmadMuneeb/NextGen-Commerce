import express from "express"
import { imageHandleUpload } from "../../controller/admin/product.controller.js"
import { upload } from "../../helper/cloudinary.js"
const Router = express.Router()

Router.post("/upload", upload.single("file"), imageHandleUpload)
export default Router