import { configureStore} from "@reduxjs/toolkit";
import TimerDataSlice from "./setTimerTime";
import test from "./test";




export const store =  configureStore({
    reducer: {
        TimerDataSlice: TimerDataSlice,
        test: test,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


