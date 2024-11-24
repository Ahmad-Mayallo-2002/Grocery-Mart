import { model, Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "Category", timestamps: true }
);

export const Category = model("Category", CategorySchema);
