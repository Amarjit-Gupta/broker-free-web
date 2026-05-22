import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect("mongodb+srv://guptaamarjit777:4CimwemWzP2chirV@my-cluster.pz0rn.mongodb.net/mern-project");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
