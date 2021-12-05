import {combineReducers, createStore} from "@reduxjs/toolkit";
import {setTimerTime} from "./setTimerTime";

const rootReducer = combineReducers({
    setTimerTime: setTimerTime,
})
export type RootState = ReturnType<typeof  rootReducer>
export const store = createStore(rootReducer)