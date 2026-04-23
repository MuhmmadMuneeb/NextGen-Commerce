import mongoose from 'mongoose';

const PopupSchema = new mongoose.Schema({
    triggerId: { 
        type: String, 
        required: true, 
        unique: true // e.g., "DROP_SEASON_01"
    },
    headline: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    imageUrl: { 
        type: String 
    },
    type: { 
        type: String, 
        enum: ['DISCOUNT', 'INFO', 'SYSTEM_ALERT'], 
        default: 'INFO' 
    },
    displayDelay: { 
        type: Number, 
        default: 3000 // Time in milliseconds (e.g., 3s)
    },
    isActive: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

const Popup = mongoose.model('Popup', PopupSchema);
export default Popup;