import { config } from "dotenv";
import { Router } from "express";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import {authorizationFunction} from "../middleware/authorization.js";
import {User} from "../models/User.js";

config();

export const router = Router();

router.get("/get-categories", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(201).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.post("/add-category", authorizationFunction, async (req, res) => {
  try {
    const checkAdmin = await User.findById(req.headers.id);
    const category = await Category.findOne({category_name: req.body.category_name});
    if (checkAdmin.role !== "admin") return res.status(400).json({msg: "You Are Not Admin"});
    if (category) return res.status(400).json({msg: "This Category is Exist"});
    const newCategory = new Category({category_name: req.body.category_name});
    await newCategory.save();
    return res.status(201).json({msg: "New Category is Added"});
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
})

router.delete("/delete-category/:id", authorizationFunction, async (req, res) => {
  try {
    const checkAdmin = await User.findById(req.headers.id);
    if (checkAdmin.role !== "admin") return res.status(400).json({msg: "You Are Not Admin"});
    await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json({msg: "Category is Deleted"});
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
})

router.get("/filter-products", async (req, res) => {
  try {
    let products;
    if (req.query.category === "all") {
      products = await Product.find();
    } else {
      products = await Product.find({ product_brand: req.query.category });
    }
    return res.status(201).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});
