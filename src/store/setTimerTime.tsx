import {createSlice, PayloadAction} from "@reduxjs/toolkit";



interface typeStateTimerHoursMinutesSecond {
    Hours: number,
    Minutes: number,
    Second: number,
}


const initialState = {
    Hours: 0,
    Minutes: 0,
    Second: 0,
} as  typeStateTimerHoursMinutesSecond


export const TimerDataSlice = createSlice({
    name: "testOne",
    initialState,
    reducers: {
        incrementHours: (state) => {
            if(state.Minutes >= 24 ){
                state.Minutes = 0;
            }else{
                state.Minutes++
            }
        },
        decrementHours: (state) => {
            if(state.Minutes <= 0 ){
                state.Minutes = 24;
            }else{
                state.Minutes--
            }
        },
        incrementMinutes: (state) => {
            if(state.Minutes >= 60 ){
                state.Minutes = 0;
            }else{
                state.Minutes++
            }
        },
        decrementMinutes: (state) => {
            if(state.Minutes <= 0 ){
                state.Minutes = 60;
            }else{
                state.Minutes--
            }
        },
        incrementSecond: (state) => {
            if(state.Minutes >= 60 ){
                state.Minutes = 0;
            }else{
                state.Minutes++
            }
        },
        decrementSecond: (state) => {
            if(state.Minutes <= 0 ){
                state.Minutes = 60;
            }else{
                state.Minutes--
            }
        }


    }
})

export const {decrementMinutes, decrementHours, decrementSecond, incrementHours, incrementSecond, incrementMinutes}  =  TimerDataSlice.actions
export default TimerDataSlice.reducer


