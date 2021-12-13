import {createAsyncThunk, createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {DateTime} from "luxon";

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
    difference: number,
    useLocalTime: boolean
}

interface TimeHoursMinutesSecond{
    hours: number,
    minutes: number,
    seconds: number,
    fullTime: Array<string>
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
            seconds: 0,
            fullTime: []
        },
        dataInString: '',
        mainClockCity: '',
        difference: 0,
        useLocalTime: true,
    },


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
        const cityNameForRequest: string = cityName;
        return {data , cityNameForRequest};
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

        },
        setDefaultTime: (state) => {
            if(state.mainClock.useLocalTime){
                   let time: string[] =  DateTime.local().toFormat('TT').split(':')
                    state.mainClock.time.hours =  Number(time[0])
                    state.mainClock.time.minutes =  Number(time[1])
                    state.mainClock.time.seconds =  Number(time[2])
            }else {
                if (state.mainClock.difference < 0) {
                    state.mainClock.time.fullTime = DateTime.local().plus({
                        hours: state.mainClock.difference * -1,
                        minutes: 0
                    }).setLocale('en').toFormat('TT').split(":");
                } else {
                        state.mainClock.time.fullTime = DateTime.local().plus({
                            hours: state.mainClock.difference,
                            minutes: 0
                        }).setLocale('en').toFormat('TT').split(":");
                }
                state.mainClock.time.hours = Number(state.mainClock.time.fullTime[0])
                state.mainClock.time.minutes = Number(state.mainClock.time.fullTime[1])
                state.mainClock.time.seconds = Number(state.mainClock.time.fullTime[2])
            }
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCityList.fulfilled, (state, {payload}) => {
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
        })
        builder.addCase(dataRetrievalOnRequest.fulfilled, (state, {payload}) =>{
            console.log(payload);
            if((payload.data.geo.state !== payload.cityNameForRequest) && (payload.data.timezone.split("/")[1] !== payload.cityNameForRequest) && (payload.data.geo.city !== payload.cityNameForRequest)){
                //if city not found
                console.log("no");
            }else{
                //if city found
                state.mainClock.useLocalTime = false;
                console.log("ok");
                state.mainClock.mainClockCity = payload.cityNameForRequest;
                const date = +new Date();
                const date2  = +new Date(payload.data.date_time_txt);
                state.mainClock.difference = Math.round((date - date2) / (1000 * 60 * 60));
                console.log(state.mainClock.difference , DateTime.local().plus({hours: state.mainClock.difference * -1, minutes: 0}).setLocale('en').toFormat('TT'));
            }
        })
    })
})
export const {check, upDateClockDate, setDefaultTime} = clock.actions
export default clock.reducer