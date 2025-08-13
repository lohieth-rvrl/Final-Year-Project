import { Schema, model } from "mongoose";

function arrayLimit(val) {
    return val.length > 0 && val.length <= 10;
}

const lectureSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1 // duration in minutes
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    isPreviewFree: {
        type: Boolean,
        default: false
    }
}, { _id: false });

const chapterSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    lectures: {
        type: [lectureSchema],
        default: []
    }
}, { _id: false });

const courseSchema = new Schema({
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    keypoints: { type: [String], required: true, validate: [arrayLimit, '{PATH} exceeds the limit of 10'] },
    thumbnail: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0, max: 100 },
    category: { 
        type: String, 
        required: true, 
        enum: ['web-development', 'data-science', 'machine-learning', 'mobile-development', 'design', 'marketing', 'business', 'other'], 
        default: 'other' 
    },
    level: { 
        type: String, 
        required: true, 
        enum: ['beginner', 'intermediate', 'advanced'], 
        default: 'beginner' 
    },
    chapters: {
        type: [chapterSchema],
        default: []
    },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default model('Course', courseSchema);
