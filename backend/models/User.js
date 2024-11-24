import { model, Schema, Types } from "mongoose";

const CustomProductSchema = new Schema({
  product_id: {
    type: Types.ObjectId,
    ref: "Product",
    required: true,
  },
  product_amount: {
    type: Number,
    default: 1,
    required: true,
  },
});

const OrderSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  order_date: {
    type: Date,
    default: Date.now(),
  },
  total_price: {
    type: Number,
    required: true,
  },
  products: [CustomProductSchema],
});

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
    cart: [CustomProductSchema],
    orders: [OrderSchema],
    phone: {
      type: Number,
      required: true,
    },
    country: {
      type: Types.ObjectId,
      ref: "Country",
      required: true,
    },
  },
  { collection: "User", timestamps: true }
);

export const User = model("User", UserSchema);
