import {createSlice, PayloadAction} from "@reduxjs/toolkit";



interface typeStateTimerHoursMinutesSecond {
    Hours: number,
    Minutes: number,
    Second: number,
    stateTimer: boolean,

}


const initialState: typeStateTimerHoursMinutesSecond = {
    Hours: 0,
    Minutes: 0,
    Second: 0,
    stateTimer: false,
}


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
        },
        upDateHours: (state, action: PayloadAction<number>) =>{
            state.Hours = action.payload;
        },
        upDateMinutes: (state, action: PayloadAction<number>) =>{
            state.Minutes = action.payload;
        },
        upDateSecond: (state, action: PayloadAction<number>) =>{
            state.Second = action.payload;
        },
        setStateTimer: (state, action) => {
            state.stateTimer  = action.payload
        },
    }
})

export const {setStateTimer, decrementMinutes, decrementHours, decrementSecond, incrementHours, incrementSecond, incrementMinutes, upDateHours, upDateMinutes, upDateSecond}  =  TimerDataSlice.actions
export default TimerDataSlice.reducer


