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


// import { Schema, model } from 'mongoose';

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     trim: true
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true
//   },

//   password: {
//     type: String,
//     required: true,
//     trim: true
//   },

//   role: {
//     type: String,
//     enum: ['user', 'admin', 'tester', 'instructor'],
//     default: 'user'
//   },

//   preferredLanguage: {
//     type: String,
//     default: 'en'
//   },

//   isEmailVerified: {
//     type: Boolean,
//     default: false
//   },

//   profilePictureUrl: {
//     type: String,
//     default: ''
//   },

//   bio: {
//     type: String,
//     trim: true
//   },

//   enrolledCourses: [{
//     course: {
//       type: Schema.Types.ObjectId,
//       ref: 'Course'
//     },
//     enrolledAt: {
//       type: Date,
//       default: Date.now
//     },
//     progress: {
//       type: Number, // percentage (0–100)
//       default: 0
//     }
//   }],

//   wishlistCourses: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Course'
//   }],

//   purchasedItems: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Product' // for e-commerce integration
//   }],

//   badges: [{
//     type: String // e.g., 'Beginner', 'Top Learner'
//   }],

//   lastLoginAt: {
//     type: Date
//   },

//   settings: {
//     darkMode: {
//       type: Boolean,
//       default: false
//     },
//     notificationsEnabled: {
//       type: Boolean,
//       default: true
//     }
//   }

// }, {
//   timestamps: true
// });

// export default model('User', userSchema);