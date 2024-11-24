import { model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
      unique: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_category: {
      type: String,
      required: true,
    },
  },
  { collection: "Product", timestamps: true }
);

export const Product = model("Product", ProductSchema);
