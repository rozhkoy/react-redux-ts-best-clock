import {createAsyncThunk, createSlice, current, PayloadAction} from "@reduxjs/toolkit";

// interface

interface clockState {
    value: number,
    cityListForHints: Array<assortedCityList>,
    apiStatus: boolean,
    mainClock: mainClocKI,

}

interface mainClocKI{
    time: TimeHoursMinutesSecond,
    dataInString: string,
    mainClockCity: string,
    difference: number
}

interface TimeHoursMinutesSecond{
    hours: number,
    minutes: number,
    seconds: number
}

interface mainClockAction{
    time: string,
    data: string,
}

export interface assortedCityList {
    id: number,
    cityName: string,

}

const initialClockState:clockState = {
    value: 20,
    cityListForHints: [],
    apiStatus: false,
    mainClock: {
        time: {
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        dataInString: '',
        mainClockCity: '',
        difference: 0
    }
} as clockState


export const fetchCityList = createAsyncThunk(
    "cityList",
    async () => {
        const response = await fetch(
            `https://restcountries.com/v2/all`
        );
        const data: any = await  response.json();
        return data;
    }
)

export const dataRetrievalOnRequest = createAsyncThunk(
    'dataRetrieval',
    async (cityName:string) => {
        const response = await fetch(
            `https://api.ipgeolocation.io/timezone?apiKey=1951161faacc41268be75b771f166a97&location=${cityName}`
        );
        const data: any = await  response.json();
        return data;
    }
)


export const clock = createSlice({
    name: "clock",
    initialState: initialClockState,
    reducers: {
        check: (state) => {
            console.log(state.cityListForHints);
        },
        upDateClockDate: (state, action:PayloadAction<mainClockAction>) => {

        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCityList.fulfilled, (state, {payload}) => {
            console.log("start");
            if(!state.apiStatus) {
                for (let i = 0; i < payload.length; i++) {
                    if ('capital' in payload[i]) {
                        state.cityListForHints.push({
                            id: state.cityListForHints.length,
                            cityName: payload[i].capital
                        } as assortedCityList)
                    }
                }
            }
            state.apiStatus = true;
            console.log("go")
            console.log(current(state.cityListForHints));
        })
        builder.addCase(dataRetrievalOnRequest.fulfilled, (state, {payload}) =>{
            console.log(payload);
        })

    })
})
export const {check, upDateClockDate} = clock.actions
export default clock.reducer