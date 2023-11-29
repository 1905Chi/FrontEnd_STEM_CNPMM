import { createSlice } from '@reduxjs/toolkit';

const dataExam = createSlice({
  name: 'exam',
  initialState: {
    value: null,
    request: null,
  },
  reducers: {
    selectexam: (state, action) => {
      state.value = action.payload;
    },
    
  },
});

export const { selectexam } = dataExam.actions;
export const selectselectexam = (state) => state.exam.value;
export default dataExam.reducer;
