import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "HomerentUser" },
    userEmail: String,
    title: String,
    area: Number,
    rent: Number,
    pincode: Number,
    bhk: String,
    contact: Number,
    availability: String,
    address: String,
    fileName: String,
    url: String,
    public_id: String,
  },
  { timestamps: true }
);

const Data =
  mongoose.models.HomerentData ||
  mongoose.model("HomerentData", dataSchema);

export default Data;