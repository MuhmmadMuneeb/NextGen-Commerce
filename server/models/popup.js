import mongoose from "mongoose";

const PopupSchema = new mongoose.Schema(
  {
    triggerId: {
      type: String,
      required: true,
      unique: true,
      trim: true, // removes extra spaces
    },

    headline: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    imageUrl: {
      type: String,
      required: true, // matches your controller requirement
    },

    type: {
      type: String,
      enum: ["DISCOUNT", "INFO", "SYSTEM_ALERT"],
      default: "INFO",
    },

    displayDelay: {
      type: Number,
      default: 3000,
      min: 0,
      max: 60000, // max 60 seconds safety limit
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    priority: {
      type: Number,
      default: 0, // future multi-popup handling
    },
  },
  {
    timestamps: true,
  }
);

// 🚀 Performance Index (important for live popup query)
PopupSchema.index({ isActive: 1 });

const Popup = mongoose.model("Popup", PopupSchema);

export default Popup;