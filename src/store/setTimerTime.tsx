import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";


interface typeStateTimerHoursMinutesSecond {
    Hours?: number,
    Minutes?: number,
    Second?: number,
}


const initialState = {
    Hours: 0,
    Minutes: 0,
    Second: 0,
} as  typeStateTimerHoursMinutesSecond


export const testSlice = createSlice({
    name: "testOne",
    initialState,
    reducers: {
        increment: (state,action    :PayloadAction<any>) => {
             state.Hours += action.payload;
        }
    }
})
// export const authSelector = (state: RootState) => state.
export const {increment}  =  testSlice.actions
export default testSlice.reducer


