import { configureStore } from "@reduxjs/toolkit";
import firstSlice from "./slice.ts";

const store = configureStore({
  reducer: {
    firstSlice: firstSlice,
  },
});

export type IRootState = ReturnType<typeof store.getState>;

export default store;
