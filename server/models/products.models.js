import mongoose from "mongoose";
const { Schema } = mongoose;
const ProductSchema = new Schema(
  //TODO: validate data
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img1: {
      type: String,
      required: true,
    },
    img2: {
      type: String,
      required: true,
    },
    img3: {
      type: String,
      required: true,
    },
    img4: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    long_desc: {
      type: String,
      required: true,
    },
    short_desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
