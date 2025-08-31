import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },

    enrolledAt: { type: Date, default: Date.now },

    progress: {
      completedLectures: [{ type: Schema.Types.ObjectId }],
      percentage: { type: Number, default: 0, min: 0, max: 100 },
    },

    status: {
      type: String,
      enum: ["active", "completed", "dropped"],
      default: "active",
    },

    certificateUrl: { type: String, trim: true }, // optional

    personalizedPath: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("Enrollment", enrollmentSchema);