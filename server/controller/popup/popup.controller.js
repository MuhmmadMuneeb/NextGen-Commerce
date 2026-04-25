import { imageUploadUtil } from "../../helper/cloudinary.js";
import Popup from "../../models/popup.js";

// 1. CREATE: Initialize a new popup template
export const createPopup = async (req, res) => {
  try {
    const { triggerId, headline, description, type, displayDelay } = req.body;
    if (!triggerId || !headline || !description || !type) {
      return res.status(400).json({
        success: false,
        message: "MISSING_REQUIRED_FIELDS"
      });
    }
    let image;
    if (req.file) {
      const result = await imageUploadUtil(req.file);
      image = result.secure_url;
    } else {
      image = req.body.image;
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "IMAGE_REQUIRED",
      });
    }

    const newPopup = new Popup({
      triggerId,
      headline,
      description,
      imageUrl: image,
      type,
      displayDelay,
      isActive: false, // Security: Always start as inactive
    });

    await newPopup.save();
    res.status(201).json({
      success: true,
      message: "POPUP_INITIALIZED_SUCCESSFULLY",
      data: newPopup
    });
  } catch (error) {
    console.log("Error initializing popup:", error);
    res.status(500).json({
      success: false,
      message: "INITIALIZATION_FAILED",
      error: error.message
    });
  }
};

// 2. READ: Get all popups for the Admin List
export const getAllPopups = async (req, res) => {
  try {
    const popups = await Popup.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: popups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "FETCH_ERROR",
      error: error.message
    });
  }
};

// 3. READ: Get the LIVE popup for the Public Frontend
export const getLivePopup = async (req, res) => {
  try {
    const popup = await Popup.findOne({ isActive: true });
    res.status(200).json({
      success: true,
      data: popup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "LIVE_FETCH_FAILED"
    });
  }
};

// 4. UPDATE: Modify existing popup details
export const updatePopup = async (req, res) => {
  try {
    const { id } = req.params;
    const { triggerId, headline, description, type, displayDelay } = req.body;
    let image;
    if (req.file) {
      const result = await imageUploadUtil(req.file);
      image = result.secure_url;
    } else {
      image = req.body.image;
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "IMAGE_REQUIRED",
      });
    }

    // Using returnDocument: 'after' to solve the Mongoose deprecation warning
    const updatedPopup = await Popup.findByIdAndUpdate(
      id,
      { triggerId, headline, description, imageUrl: image, type, displayDelay },
      {new: true}
    );
    console.log("FILE:", req.file);
    console.log("image:", image);
    if (!updatedPopup) {
      return res.status(404).json({ success: false, message: "POPUP_NOT_FOUND" });
    }

    res.status(200).json({
      success: true,
      message: "POPUP_RECONFIGURED",
      data: updatedPopup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "UPDATE_ERROR",
      error: error.message
    });
  }
};

// 5. PATCH: Toggle Activation (Master Switch Logic)
export const togglePopupActive = async (req, res) => {
  try {
    const { id } = req.params;
    const popup = await Popup.findById(id);

    if (!popup) {
      return res.status(404).json({ success: false, message: "POPUP_NOT_FOUND" });
    }

    // Logic: If we are turning this popup ON, turn ALL others OFF
    if (!popup.isActive) {
      await Popup.updateMany({}, { isActive: false });
    }

    popup.isActive = !popup.isActive;
    await popup.save();

    res.status(200).json({
      success: true,
      message: popup.isActive ? "POPUP_SIGNAL_LIVE" : "POPUP_SIGNAL_OFFLINE",
      data: popup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "TOGGLE_FAILED",
      error: error.message
    });
  }
};

// 6. DELETE: Permanent removal of the asset
export const deletePopup = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Popup.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "POPUP_NOT_FOUND" });
    }

    res.status(200).json({
      success: true,
      message: "POPUP_DELETED_PERMANENTLY"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "DELETE_ERROR",
      error: error.message
    });
  }
};