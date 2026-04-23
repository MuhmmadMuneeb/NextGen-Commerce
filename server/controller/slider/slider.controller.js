import Slider from "../../models/slider.js";

// CREATE: Add new slider unit
export const addSlider = async (req, res) => {
  try {
    const { title, subtitle, image, linkUrl, priority } = req.body;
    if (!title || !image || !linkUrl || !priority) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newSlider = new Slider({
      title,
      subtitle,
      image,
      linkUrl,
      priority,
    });

    await newSlider.save();
    res.status(201).json({ success: true, message: "SLIDER_DEPLOYED", data: newSlider });
  } catch (error) {
    res.status(500).json({ success: false, message: "DEPLOYMENT_FAILED", error: error.message });
  }
};

// READ: Fetch all active sliders for the frontend
export const getActiveSliders = async (req, res) => {
  try {
    const sliders = await Slider.find({ isActive: true }).sort({ priority: 1 });
    res.status(200).json({ success: true, data: sliders });
  } catch (error) {
    res.status(500).json({ success: false, message: "FETCH_ERROR" });
  }
};

// DELETE: Remove a slider unit
export const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSlider = await Slider.findByIdAndDelete(id);
    
    if (!deletedSlider) return res.status(404).json({ success: false, message: "UNIT_NOT_FOUND" });
    
    res.status(200).json({ success: true, message: "UNIT_DECOMMISSIONED" });
  } catch (error) {
    res.status(500).json({ success: false, message: "DELETE_FAILED" });
  }
};