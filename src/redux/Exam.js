import { createSlice } from '@reduxjs/toolkit';

const dataExam = createSlice({
	name: 'exam',
	initialState: {
		value: null,
		request: null,
		submition: null,
		question: null,
		answer: [],
	},
	reducers: {
		selectexam: (state, action) => {
			state.value = action.payload;
		},
		selectsubmition: (state, action) => {
			state.submition = action.payload;
		},
		selectquestion: (state, action) => {
			state.question = action.payload;
		},
		editquestion: (state, action) => {
			state.question.forEach(element => {
				if (element.id === action.payload.id) {
					element.content = action.payload.content;
					element.level=	action.payload.level;
					element.typeCode=	action.payload.typeCode;				
				}
				
			});
		},
		selectanswer: (state, action) => {
			if (action.payload === null) {
				state.answer = [];
			} else {
				if (state.answer.length === 0) {
					state.answer.push(action.payload);
				} else {
					const exis = state.answer.find((item) => item.id === action.payload.id);
					if (!exis) {
						state.answer.push(action.payload);
					}
				}
			}
		},
	},
});

export const { selectexam, selectsubmition, selectquestion, selectanswer,editquestion } = dataExam.actions;
export const selectselectexam = (state) => state.exam.value;
export const selectselectsubmition = (state) => state.exam.submition;
export const selectselectquestion = (state) => state.exam.question;
export const selectselectanswer = (state) => state.exam.answer;
export default dataExam.reducer;
