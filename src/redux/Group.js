// src/features/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    selectedOption: 'introduce',
    selectedOptionProfile:'introduce',
  },
  reducers: {
    selectOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    selectOptionProfile: (state, action) => {
      state.selectedOptionProfile = action.payload;
    },
  },
});

export const { selectOption,selectOptionProfile } = menuSlice.actions;
export const selectSelectedOption = (state) => state.menu.selectedOption;
export const selectSelectedOptionProfile = (state) => state.menu.selectedOptionProfile;
export default menuSlice.reducer;
