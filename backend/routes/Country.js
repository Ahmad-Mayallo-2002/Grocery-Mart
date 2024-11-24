import { config } from "dotenv";
import { Router } from "express";
import { Country } from "../models/Country.js";
import {authorizationFunction} from "../middleware/authorization.js";
import {User} from "../models/User.js";

config();

export const router = Router();

router.get("/get-countries", async (req, res) => {
  try {
    const countries = await Country.find();
    return res.status(200).json(countries);
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.post("/add-country", authorizationFunction, async (req, res) => {
  try {
    const { code, country, tax_rate } = req.body;
    const checkAdmin = await User.findById(req.headers.id);
    const currentCountry = await Country.findOne({country: country}) || await Country.findOne({code: code});

    if (checkAdmin.role !== "admin") return res.status(400).json({msg: "You Are Not Admin"});
    if (currentCountry) return res.status(400).json({msg: "This Country or Code is Exist"});

    const newCountry = new Country({
      code: code,
      country: country,
      tax_rate: tax_rate
    });
    await newCountry.save();
    return res.status(201).json({msg: "New Country is Added"});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})

router.delete("/delete-country/:countryId", authorizationFunction, async (req, res) => {
  try {
    const { id } = req.headers;
    const { countryId } = req.params;
    const currentUser = await User.findById(id);
    if (currentUser?.role === "admin") {
      await Country.findByIdAndDelete(countryId);
      return res.status(200).json({msg: "Country is Deleted"});
    }
    return res.status(400).json({msg: "You are Not Admin"});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})