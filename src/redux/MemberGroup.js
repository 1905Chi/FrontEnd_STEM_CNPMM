import { createSlice } from '@reduxjs/toolkit';

const dataMemberGroup = createSlice({
  name: 'memberGroup',
  initialState: {
    value: null,
    request: null,
  },
  reducers: {
    selectMemberGroup: (state, action) => {
      state.value = action.payload;
    },
    selectMemberGroupRequest: (state, action) => {
      state.request = action.payload;
    },
  },
});

export const { selectMemberGroup, selectMemberGroupRequest } = dataMemberGroup.actions;
export const selectselectMemberGroup = (state) => state.memberGroup.value;
export const selectselectMemberGroupRequest = (state) => state.memberGroup.request;
export default dataMemberGroup.reducer;
