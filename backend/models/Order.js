// models/Order.js
import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    // Optional ref (use when your menu is stored in DB)
    foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", required: false },
    // For current UI that sends plain items
    name: { type: String, required: false, trim: true },
    price: { type: Number, required: false, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [OrderItemSchema], required: true, validate: v => v.length > 0 },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },

    // 🔒 Idempotency: one logical order per clientKey
    clientKey: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
