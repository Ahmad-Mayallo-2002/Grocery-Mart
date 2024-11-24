import { Router } from "express";
import { config } from "dotenv";
import { authorizationFunction } from "../middleware/authorization.js";
import { User } from "../models/User.js";

config();

export const router = Router();

router.post("/add-to-cart", authorizationFunction, async (req, res) => {
  try {
    const currentCart = (await User.findById(req.headers.id)).cart;
    const result = currentCart.find(
      (item) => String(item.product_id) === req.body.product_id
    );
    if (result)
      return res.status(400).json({ msg: "This Product is Exist in Cart" });
    await User.findByIdAndUpdate(req.headers.id, {
      $push: {
        cart: {
          product_amount: req.body.product_amount,
          product_id: req.body.product_id,
        },
      },
    });
    return res.status(201).json({ msg: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.delete(
  "/delete-from-cart/:productId",
  authorizationFunction,
  async (req, res) => {
    try {
      const currentCart = (await User.findById(req.headers.id)).cart;
      const result = currentCart.find(
        (item) => item._id.toString() === req.params.productId
      );
      if (!result)
        return res.status(404).json({ msg: "This Product is Not Found" });
      await User.findOneAndUpdate(
        { _id: req.headers.id },
        { $pull: { cart: { _id: req.params.productId } } }
      );
      return res.status(201).json({ msg: "Deleted From Cart" });
    } catch (error) {
      console.log(error);
      res.status(500).json(process.env.SERVER_ERROR);
    }
  }
);

router.get("/get-cart", authorizationFunction, async (req, res) => {
  try {
    const currentUser = await User.findById(req.headers.id).populate({
      path: "cart.product_id",
      select: "-product_description",
    });
    return res.status(201).json(currentUser.cart);
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});
