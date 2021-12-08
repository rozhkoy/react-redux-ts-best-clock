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
            if(state.Hours >= 24 ){
                state.Hours = 0;
            }else{
                state.Hours++
            }
        },
        decrementHours: (state) => {
            if(state.Hours <= 0 ){
                state.Hours = 24;
            }else{
                state.Hours--
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
            if(state.Second >= 60 ){
                state.Second = 0;
            }else{
                state.Second++
            }
        },
        decrementSecond: (state) => {
            if(state.Second <= 0 ){
                state.Second = 60;
            }else{
                state.Second--
            }
        }


    }
})

export const {decrementMinutes, decrementHours, decrementSecond, incrementHours, incrementSecond, incrementMinutes}  =  TimerDataSlice.actions
export default TimerDataSlice.reducer


