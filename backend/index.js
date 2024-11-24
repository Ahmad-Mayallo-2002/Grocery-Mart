import { config } from "dotenv";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { router as user } from "./routes/User.js";
import { router as order } from "./routes/Order.js";
import { router as product } from "./routes/Product.js";
import { router as cart } from "./routes/Cart.js";
import { router as country } from "./routes/Country.js";
import { router as category } from "./routes/Category.js";
import "./db.js";

config();

const port = process.env.PORT || 8000;
const errorMessage = process.env.SERVER_ERROR;

const app = express();
const api = "/api";

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(api, user);
app.use(api, order);
app.use(api, product);
app.use(api, cart);
app.use(api, country);
app.use(api, category);

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ msg: "Hello World" });
  } catch (error) {
    console.log(error);
    res.status(500).json(errorMessage);
  }
});

app.listen(port, () =>
  console.log(`Server is Running on Port ${port} http://localhost:${port}`)
);
