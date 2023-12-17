const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = {
  company: [],
  inventory: [],
};

const slice = createSlice({
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.company.push(action.companyName);
    },
  },
});

export const { addCompany } = Slice.actions;
export default slice.reducer;
