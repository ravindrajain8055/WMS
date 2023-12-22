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
  },
});

export const { addCompany } = Slice.actions;
export default Slice.reducer;
