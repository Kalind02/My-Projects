// models/Contact.js
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match:
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic email check
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", ContactSchema);
