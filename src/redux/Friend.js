import { createSlice } from '@reduxjs/toolkit';

const dataFriend = createSlice({
  name: 'friend',
  initialState: {
    value: null,
    request: null,
  },
  reducers: {
    selectFriend: (state, action) => {
      state.value = action.payload;
    },
    selectFriendRequest: (state, action) => {
      state.request = action.payload;
    },
  },
});

export const { selectFriend, selectFriendRequest } = dataFriend.actions;
export const selectselectFriend = (state) => state.friend.value;
export const selectselectFriendRequest = (state) => state.friend.request;
export default dataFriend.reducer;
