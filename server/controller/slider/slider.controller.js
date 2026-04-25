import Slider from "../../models/slider.js";
import { imageUploadUtil } from "../../helper/cloudinary.js";

export const addSlider = async (req, res) => {
  try {
    const { title, subtitle, linkUrl, priority } = req.body;
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);
    let image;

    if (req.file) {
      // 🔥 Upload to Cloudinary
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

    const newSlider = new Slider({
      title,
      subtitle,
      image,
      linkUrl,
      priority: priority || 0,
    });

    await newSlider.save();

    res.status(201).json({ success: true, data: newSlider });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// READ: Fetch all sliders (Admin View)
export const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find({}).sort({ priority: 1 });
    res.status(200).json({ success: true, data: sliders });
  } catch (error) {
    res.status(500).json({ success: false, message: "FETCH_ERROR", error: error.message });
  }
};

// UPDATE: Modify existing slider unit (Handles Optional Image Change)
// slider.controller.js

export const updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, linkUrl, priority} = req.body;
    const imageFile = req.file; // The new image file, if provided
    let image;

    if (imageFile) {
      // Upload the new image to Cloudinary
      const result = await imageUploadUtil(imageFile);
      image = result.secure_url
    }
   
    // console.log("BODY:", req.body);
    const existing = await Slider.findById(id);

    if (!existing) {
      return res.status(404).json({ success: false });
    }

    const updated = await Slider.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        linkUrl,
        priority,
        image: image || existing.image,
      },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// DELETE: Remove a slider unit
export const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSlider = await Slider.findByIdAndDelete(id);

    if (!deletedSlider) {
      return res.status(404).json({ success: false, message: "UNIT_NOT_FOUND" });
    }

    res.status(200).json({ success: true, message: "UNIT_DECOMMISSIONED" });
  } catch (error) {
    res.status(500).json({ success: false, message: "DELETE_FAILED", error: error.message });
  }
};

// READ: Fetch ONLY active sliders for Public Frontend
export const getActiveSliders = async (req, res) => {
  try {
    const sliders = await Slider.find({ isActive: true }).sort({ priority: 1 });
    res.status(200).json({
      success: true,
      count: sliders.length,
      data: sliders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "PUBLIC_FETCH_FAILED" });
  }
};

// UPDATE: Toggle Status
export const toggleSliderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findById(id);

    if (!slider) {
      return res.status(404).json({ success: false, message: "UNIT_NOT_FOUND" });
    }

    slider.isActive = !slider.isActive;
    await slider.save();

    res.status(200).json({
      success: true,
      message: `SLIDER_${slider.isActive ? 'ACTIVATED' : 'DEACTIVATED'}`,
      data: slider
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "TOGGLE_FAILED" });
  }
};