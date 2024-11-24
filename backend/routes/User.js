import { Router } from "express";
import { config } from "dotenv";
import { User } from "../models/User.js";
import { compareSync, hashSync } from "bcrypt";
import { authorizationFunction } from "../middleware/authorization.js";
import pkg from "jsonwebtoken";

config();

export const router = Router();

router.patch("/update-password", async (req, res) => {
  try {
    const { password, newPassword, email } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) return res.status(404).json({ msg: "Invalid Email" });
    if (password !== newPassword)
      return res.status(400).json({ msg: "Password are Not Matched" });

    await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashSync(newPassword, 10) } }
    );
    return res.status(201).json({ msg: "Password Update is Done" });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, phone, country, role, image } = req.body;
    const checkEmail = await User.findOne({ email: email });
    const hashedPassword = hashSync(password, 10);
    if (checkEmail)
      return res.status(400).json({ msg: "This Email is Already Exist" });
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      phone: phone,
      country: country,
      image: image,
      role: role,
    });
    await newUser.save();

    return res.status(201).json({ msg: "Sign Up is Done" });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await User.findOne({ email: email }).populate("country");
    if (!checkUser) return res.status(404).json({ msg: "Invalid Email" });

    const comparePassword = compareSync(password, checkUser.password);
    if (!comparePassword)
      return res.status(404).json({ msg: "Invalid Password" });

    const token = pkg.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "30d" }
    );
    return res.status(201).json({
      id: checkUser._id,
      role: checkUser.role,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.get("/get-users", authorizationFunction, async (req, res) => {
  try {
    const checkAdmin = await User.findById(req.headers.id);
    if (checkAdmin.role === "admin") {
      const users = await User.find({ role: "user" })
        .populate("country")
        .select(["-password", "-orders", "-cart"])
        .limit(req.query.limit)
        .skip(req.query.skip);
      const length = await User.countDocuments({ role: "user" });
      return res.status(201).json({ users: users, length: length });
    }
    return res
      .status(400)
      .json({ msg: "You Are Not Admin To Access To Users Data" });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.get("/get-users/:id", authorizationFunction, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("country");
    if (user) {
      return res.status(201).json(user);
    }
    return res.status(404).json({ msg: "This User is Not Found" });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.delete("/delete-user/:id", authorizationFunction, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(201).json({ msg: "User is Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.patch("/update-user/:id", authorizationFunction, async (req, res) => {
  try {
    const { username, email, phone, country, image } = req.body;
    let requestBody = {};
    username ? (requestBody.username = username) : null;
    email ? (requestBody.email = email) : null;
    phone ? (requestBody.phone = phone) : null;
    country ? (requestBody.country = country) : null;
    image ? (requestBody.image = image) : null;
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: requestBody,
    });
    await updateUser.save();
    return res.status(201).json({ msg: "User Data is Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.patch(
  "/update-password/:id",
  authorizationFunction,
  async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: { password: req.body.password },
      });
      return res.status(201).json({ msg: "Update Password is Done" });
    } catch (error) {
      console.log(error);
      res.status(500).json(process.env.SERVER_ERROR);
    }
  }
);
