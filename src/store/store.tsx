import { configureStore} from "@reduxjs/toolkit";
import TimerDataSlice from "./setTimerTime";




export const store =  configureStore({
    reducer: {
        TimerDataSlice: TimerDataSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


