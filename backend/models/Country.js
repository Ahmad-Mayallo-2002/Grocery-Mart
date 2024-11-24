import { model, Schema } from "mongoose";

const CountrySchema = new Schema(
  {
    country: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    tax_rate: {
      type: Number,
      required: true,
    },
  },
  { collection: "Country", timestamps: true }
);

export const Country = model("Country", CountrySchema);
