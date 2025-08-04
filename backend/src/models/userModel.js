import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,   
        required: true,
        trim: true
    },
    // email: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    password: { 
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'tester', 'instructor'],
        default: 'user'
    }
}, {
    timestamps: true
});

export default model('User', userSchema);