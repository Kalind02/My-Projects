import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  image: String,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

export default mongoose.model("FoodItem", foodItemSchema);
