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
            // state.mainClock.dataInString =
            console.log("check");
            if(state.mainClock.useLocalTime){
                   let time: string[] =  DateTime.local().toFormat('TT').split(':')
                    state.mainClock.time.hours =  Number(time[0])
                    state.mainClock.time.minutes =  Number(time[1])
                    state.mainClock.time.seconds =  Number(time[2])
            }else{

            }
        }

    },
    extraReducers: (builder => {
        builder.addCase(fetchCityList.fulfilled, (state, {payload}) => {
            console.log("start");
            console.log(DateTime.local().setLocale('en').toFormat('DDDD'));
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
            if((payload.data.geo.state !== payload.cityNameForRequest) || (payload.data.timezone.split("/")[1] !== payload.cityNameForRequest)){

            }else{
                console.log("ok");
                state.mainClock.mainClockCity = payload.cityNameForRequest;

            }


        })

    })
})
export const {check, upDateClockDate, setDefaultTime} = clock.actions
export default clock.reducer