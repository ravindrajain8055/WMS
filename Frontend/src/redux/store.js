const { configureStore } = require("@reduxjs/toolkit");
import opSlice from "./slice";

export const store = configureStore({
  reducer: {
    op: opSlice,
  },
});
