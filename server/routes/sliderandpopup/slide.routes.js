import express from "express";
import { 
    addSlider, 
    deleteSlider, 
    getActiveSliders 
} from "../../controller/slider/slider.controller.js";
import { 
    createOrUpdatePopup, 
    getLivePopup 
} from "../../controller/popup/popup.controller.js";
import { upload } from "../../helper/cloudinary.js"

const router = express.Router();

//slider routes
router.post("/slider/add",upload.single("image"), addSlider);
router.delete("/slider/delete/:id", deleteSlider);
router.get("/slider/get", getActiveSliders);
// popup routes
router.post("/popup/configure",upload.single("image"), createOrUpdatePopup);
router.get("/popup/status", getLivePopup);

export default router;