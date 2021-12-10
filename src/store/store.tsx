import { configureStore} from "@reduxjs/toolkit";
import TimerDataSlice from "./setTimerTime";
import test from "./test";
import clock from "./setClockData";




export const store =  configureStore({
    reducer: {
        TimerDataSlice: TimerDataSlice,
        test: test,
        clock: clock,

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


