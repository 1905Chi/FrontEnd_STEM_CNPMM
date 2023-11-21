import { configureStore } from '@reduxjs/toolkit'
// src/app/store.js

import menuReducer from './redux/Group';
import groupItemReducer from './redux/GetItemGroup';
import memberGroupReducer from './redux/MemberGroup';
import eventGroupReducer from './redux/EventGroup';
const   store =  configureStore({
  reducer: {
    menu: menuReducer,
    groupItem:groupItemReducer,
    memberGroup:memberGroupReducer,
    eventItem:eventGroupReducer,

  },
})

export default store;