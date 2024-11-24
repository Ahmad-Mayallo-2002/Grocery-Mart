import { config } from "dotenv";
import { Router } from "express";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import { writeFileSync, unlinkSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { authorizationFunction } from "../middleware/authorization.js";
import multer from "multer";

const __dirname = dirname(fileURLToPath(import.meta.url));

config();

const upload = multer();

export const router = Router();

router.post(
  "/add-product",
  upload.single("product_image"),
  async (req, res) => {
    try {
      // Start of Body Request
      const {
        product_name,
        product_description,
        product_price,
        product_category,
      } = req.body;
      let originalFileArray = req.file.originalname.split(".");
      let fileName =
        originalFileArray[0] + "-" + Date.now() + "." + originalFileArray[1];
      let requestBody = {
        product_name: product_name,
        product_description: product_description,
        product_price: Number(product_price),
        product_category: product_category,
        product_image: fileName,
      };
      // End of Body Request

      // Check Admin
      const checkUser = await User.findById(req.headers.id);

      if (checkUser.role === "admin") {
        // Check if Product is Exist or Not
        const checkProduct = await Product.find({ product_name: product_name });
        if (checkProduct.length)
          return res.status(400).json({ msg: "This Product is Already Exist" });
        const filePath = resolve(
          "../../Grocery Mart/frontend/public/products_images/" + fileName
        );
        // Add New Product
        const newProduct = new Product(requestBody);
        // Make Product Image and Move it To Destination
        writeFileSync(filePath, req.file.buffer);
        // Save New Product And Response
        await newProduct.save();
        console.log(req.file.originalname.split(".")[1]);
        return res.status(201).json({ msg: "New Product was Added" });
      }
      // Response for Not Admin
      return res.status(400).json({ msg: "You Are Not Admin To Add Products" });
    } catch (error) {
      console.log(error);
      res.status(500).json(process.env.SERVER_ERROR);
    }
  }
);

router.get("/get-products", async (req, res) => {
  try {
    let products;
    if (req.query.category === "all") {
      products = await Product.find()
        .limit(req.query.limit)
        .skip(req.query.skip);
    } else {
      products = await Product.find({
        product_category: req.query.category,
      })
        .limit(req.query.limit)
        .skip(req.query.skip);
    }
    const length = await Product.countDocuments();
    return res.status(201).json({
      products: products,
      length: length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.get("/get-products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ msg: "This Product is Not Found" });

    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.delete("/delete-product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    let filePath = resolve(
      "../../Grocery Mart/frontend/public/products_images/" +
        product.product_image
    );
    if (!product)
      return res.status(404).json({ msg: "This Product is Not Found" });
    unlinkSync(filePath);
    await Product.findByIdAndDelete(req.params.id);
    return res.status(201).json("Product is Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.patch("/update-product/:id", authorizationFunction, async (req, res) => {
  try {
    // Start of Body Request And Its Conditions
    const {
      product_name,
      product_description,
      product_price,
      product_category,
    } = req.body;
    let requestBody = {};
    if (product_name) requestBody.product_name = product_name;
    if (product_description)
      requestBody.product_description = product_description;
    if (product_price) requestBody.product_price = product_price;
    if (product_category) requestBody.product_category = product_category;
    if (req.file)
      requestBody.product_image = req.file.originalname + "-" + Date.now();
    // End of Body Request And Its Conditions

    // Check Admin
    const checkUser = await User.findById(req.headers.id);

    if (checkUser.role === "admin") {
      // Check if Product is Exist or Not
      const checkProduct = await Product.findById(req.params.id);
      if (!checkProduct)
        return res.status(404).json({ msg: "This Product is Not Found" });

      // Make Product Image and Move it To Destination
      writeFileSync(
        resolve(__dirname, "../../frontend/public/products_images"),
        req.file.buffer
      );
      const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: requestBody,
      });
      await updateProduct.save();
      return res.status(201).json({ msg: "Product was Updated" });
    }
    // Reponse for Not Admin
    return res.status(400).json({ msg: "You Are Not Admin To Add Products" });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});
