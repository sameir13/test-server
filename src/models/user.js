import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full Name is Required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is Required"],
    },
    phone: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is Required"],
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.users || mongoose?.model("users", userSchema);
