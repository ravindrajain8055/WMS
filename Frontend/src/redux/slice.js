const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = {
  company: "",
  // inventoryul: [],
  // inventoryl: [],
  // materialul: [],
  // materiall: [],
  inventoryuldetails: {},
};

const Slice = createSlice({
  name: "Op",
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.company = action.payload;
    },
    addinventoryuldetails: (state, action) => {
      state.inventoryuldetails = action.payload;
    },
  },
});

export const { addCompany, addinventoryuldetails } = Slice.actions;
export default Slice.reducer;
