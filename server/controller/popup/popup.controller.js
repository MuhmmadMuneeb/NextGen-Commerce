import Popup from "../../models/popup.js";

// CREATE/UPDATE: Since usually only one popup is active, we use an "upsert" style or toggle
export const createOrUpdatePopup = async (req, res) => {
  try {
    const { triggerId, headline, description, imageUrl, type, displayDelay, isActive } = req.body;

    // If setting this one to active, deactivate all others first (Next-Gen Logic)
    if (isActive) {
      await Popup.updateMany({}, { isActive: false });
    }

    const popup = await Popup.findOneAndUpdate(
      { triggerId }, 
      { headline, description, imageUrl, type, displayDelay, isActive },
      { new: true, upsert: true } // Creates if doesn't exist, updates if it does
    );

    res.status(200).json({ success: true, message: "POPUP_CONFIGURED", data: popup });
  } catch (error) {
    res.status(500).json({ success: false, message: "CONFIG_ERROR", error: error.message });
  }
};

// READ: Get the current active popup for the user
export const getLivePopup = async (req, res) => {
  try {
    const popup = await Popup.findOne({ isActive: true });
    res.status(200).json({ success: true, data: popup });
  } catch (error) {
    res.status(500).json({ success: false, message: "POPUP_FETCH_FAILED" });
  }
};