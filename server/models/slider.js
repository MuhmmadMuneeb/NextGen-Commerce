import mongoose from 'mongoose';

const SliderSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "Title is required for system indexing"],
        trim: true 
    },
    subtitle: { 
        type: String, 
        uppercase: true 
    },
    image: { 
        type: String, 
        required: [true, "Image URL must be provided"] 
    },
    linkUrl: { 
        type: String, 
        default: "/shop/listing" 
    },
    priority: { 
        type: Number, 
        default: 0 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    }
}, { timestamps: true });

const Slider = mongoose.model('Slider', SliderSchema);
export default Slider;