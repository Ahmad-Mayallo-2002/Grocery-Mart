import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  dark: JSON.parse(localStorage.getItem("dark") || "false"),
  logged: cookies.get("userData") ? true : false,
  country: {
    _id: "",
    tax_rate: 0,
    code: 0,
    country: "",
  },
};

const firstSlice = createSlice({
  name: "My Slice",
  initialState: initialState,
  reducers: {
    activeDarkMode: (state) => {
      state.dark = !state.dark;
      localStorage.setItem("dark", String(state.dark));
    },
    checkLog: (state) => {
      state.logged = !state.logged;
    },
    getCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});
export default firstSlice.reducer;
export const { activeDarkMode, checkLog, getCountry } = firstSlice.actions;
