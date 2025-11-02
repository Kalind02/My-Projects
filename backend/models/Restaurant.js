import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  address: String,
  image: String,
});

export default mongoose.model("Restaurant", restaurantSchema);
