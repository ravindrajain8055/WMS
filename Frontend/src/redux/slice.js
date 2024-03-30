const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = {
  company: "",
  // inventoryul: [],
  // inventoryl: [],
  // materialul: [],
  // materiall: [],
  inventoryuldetails: {},
  unloadinglog: [],
};

const opSlice = createSlice({
  name: "op",
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.company = action.payload;
    },
    addinventoryuldetails: (state, action) => {
      state.inventoryuldetails = action.payload;
    },
    addunloadinglog: (state, action) => {
      console.log(action.payload);
      state.unloadinglog.push(action.payload);
    },
  },
});

export const { addCompany, addinventoryuldetails, addunloadinglog } = opSlice.actions;
export default opSlice.reducer;
