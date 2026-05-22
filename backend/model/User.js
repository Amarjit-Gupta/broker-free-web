import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    verifyEmailOtp: { type: String, default: "" },
    verifyEmailOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetPasswordOtp: { type: String, default: "" },
    resetPasswordOtpExpireAt: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User =
  mongoose.models.HomerentUser ||
  mongoose.model("HomerentUser", userSchema);

export default User;