import { configureStore } from '@reduxjs/toolkit'
// src/app/store.js

import menuReducer from './redux/Group';
import groupItemReducer from './redux/GetItemGroup';
import memberGroupReducer from './redux/MemberGroup';
const   store =  configureStore({
  reducer: {
    menu: menuReducer,
    groupItem:groupItemReducer,
    memberGroup:memberGroupReducer,

  },
})

export default store;