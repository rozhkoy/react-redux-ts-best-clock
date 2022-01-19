import { configureStore } from "@reduxjs/toolkit";
import TimerDataSlice from "./setTimerTime";
import clock from "./setClockData";




export const store =  configureStore({
    reducer: {
        TimerDataSlice: TimerDataSlice,
        Clock: clock,

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


