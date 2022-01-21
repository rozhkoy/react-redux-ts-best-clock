import { configureStore } from "@reduxjs/toolkit";
import TimerDataSlice from "./setTimerTime";
import clock from "./setClockData";
import Popup from "./setPopupState";





export const store =  configureStore({
    reducer: {
        TimerDataSlice: TimerDataSlice,
        Clock: clock,
        Popup: Popup

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


