import { configureStore } from '@reduxjs/toolkit'
// src/app/store.js

import menuReducer from './redux/Group';
import groupItemReducer from './redux/GetItemGroup';
import memberGroupReducer from './redux/MemberGroup';
import eventGroupReducer from './redux/EventGroup';
import friendReducer from './redux/Friend';
import ExamReducer  from './redux/Exam';
const   store =  configureStore({
  reducer: {
    menu: menuReducer,
    groupItem:groupItemReducer,
    memberGroup:memberGroupReducer,
    eventItem:eventGroupReducer,
    friend:friendReducer,
    exam:ExamReducer,

  },
})

export default store;