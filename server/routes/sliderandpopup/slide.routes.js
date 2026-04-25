import express from "express";
import {
    addSlider,
    deleteSlider,
    getActiveSliders,
    getSliders,
    toggleSliderStatus,
    updateSlider
} from "../../controller/slider/slider.controller.js";
import { upload } from "../../helper/cloudinary.js"

const router = express.Router();

//slider routes

router.post("/add", upload.single("image"), addSlider);
router.get("/get", getSliders);
router.put("/update/:id",upload.single("image"), updateSlider);    // Note the :id param
router.delete("/delete/:id", deleteSlider); // Note the :id param
router.get("/public/get", getActiveSliders);
router.patch("/toggle/:id", toggleSliderStatus); 



export default router;