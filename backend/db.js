import { config } from "dotenv";
import { connect } from "mongoose";

config();

const connectDatabase = async () => {
  try {
    connect(process.env.DATABASE_URL);
    console.log("Database Connection is Done");
  } catch (error) {
    console.log("Database Connection is Failed");
  }
};

connectDatabase();
