
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";


interface typeStateTimerHoursMinutesSecond{
    Hours: number,
    Minutes: number,
    Second: number,
}


const initialState:typeStateTimerHoursMinutesSecond = {
    Hours: 0,
    Minutes: 0,
    Second: 0,
}


export const testSlice =  createSlice({
    name: "test",
    initialState,
    reducers: {
        increment: (state: RootState) => {
            state.Minute++;
        }
    }

})


export const {increment } = testSlice.actions;
// export default testSlice.reducer



