import { Router } from "express";
import { config } from "dotenv";
import { User } from "../models/User.js";
import { authorizationFunction } from "../middleware/authorization.js";

config();

export const router = Router();

router.post("/add-order", authorizationFunction, async (req, res) => {
  try {
    const requestBody = {
      user_id: req.headers.id,
      status: "Shipped",
      total_price: req.body.total_price,
      products: req.body.products,
    };
    if (!req.body.products.length)
      return res
        .status(404)
        .json({ msg: "There Are No Products In Cart To Order" });
    await User.findByIdAndUpdate(req.headers.id, {
      $push: { orders: requestBody },
    });
    await User.findByIdAndUpdate(req.headers.id, { $set: { cart: [] } });
    return res.status(201).json({ msg: "Order is Shipped" });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.patch(
  "/cancel-or-deliver-order/:orderId",
  authorizationFunction,
  async (req, res) => {
    try {
      const user = await User.findById(req.headers.id);
      const currentOrder = user.orders.find(
        (item) => item._id.toString() === req.params.orderId
      );
      if (!currentOrder)
        return res.status(404).json({ msg: "This Order is Not Exist" });
      currentOrder.status = req.body.status;
      await user.save();
      return res.status(201).json({ msg: `Order is ${req.body.status}` });
    } catch (error) {
      console.log(error);
      res.status(500).json(process.env.SERVER_ERROR);
    }
  }
);

router.delete(
  "/delete-order/:orderId",
  authorizationFunction,
  async (req, res) => {
    try {
      const user = await User.findById(req.headers.id);
      const currentOrder = user.orders.find(
        (item) => item._id.toString() === req.params.orderId
      );
      if (!currentOrder)
        return res.status(404).json({ msg: "This Order is Not Exist" });
      user.orders.splice(user.orders.indexOf(currentOrder), 1);
      await user.save();
      return res.status(201).json({ msg: "Order is Deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json(process.env.SERVER_ERROR);
    }
  }
);

router.get("/get-orders", async (req, res) => {
  try {
    const user = await User.findById(req.headers.id)
      .populate(["orders.products.product_id"])
      .select("orders");
    if (!user) return res.status(404).json({ msg: "This User is Not Found" });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.get("/get-orders-admin", authorizationFunction, async (req, res) => {
  try {
    const checkAdmin = await User.findById(req.headers.id);
    if (checkAdmin.role !== "admin")
      return res.status(400).json({ msg: "You Are Not Admin" });
    const orders = await User.find()
      .populate({
        path: "country",
      })
      .select(["username", "email", "image", "country", "orders"]);
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});
