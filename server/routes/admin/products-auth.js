import express from "express"
import { addProducts, allProducts, deleteProducts, editProducts, imageHandleUpload } from "../../controller/admin/product.controller.js"
import { upload } from "../../helper/cloudinary.js"

const Router = express.Router()

Router.post("/upload-image", upload.single("image"), imageHandleUpload)
Router.post("/add",addProducts )
Router.get("/get-all",allProducts )
Router.post("/edit/:id",editProducts )
Router.post("/delete/:id",deleteProducts )
export default Router