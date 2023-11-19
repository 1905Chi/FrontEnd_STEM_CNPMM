// src/features/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dataMemberGroup = createSlice({
  name: 'memberGroup',
  initialState: {
    value: null ,
  },
  reducers: {
    selectMemberGroup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectMemberGroup } = dataMemberGroup.actions;
export const selectselectMemberGroup = (state) => state.memberGroup.value;
export default dataMemberGroup.reducer;
