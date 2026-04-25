import express from "express";
const router = express.Router();
import {
  createPopup,
  getAllPopups,
  getLivePopup,
  updatePopup,
  togglePopupActive,
  deletePopup
} from "../../controller/popup/popup.controller.js";
import { upload } from "../../helper/cloudinary.js"

router.post("/create", upload.single("imageUrl"), createPopup);
router.get("/all", getAllPopups);        // For Admin
router.get("/live", getLivePopup);      // For Website Header/Home
router.put("/update/:id", upload.single("imageUrl"), updatePopup);
router.patch("/toggle/:id", togglePopupActive);
router.delete("/delete/:id", deletePopup);

export default router;