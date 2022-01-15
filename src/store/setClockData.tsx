import {createAsyncThunk, createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {DateTime} from "luxon";

// interface

interface clockState {
    value: number,
    cityListForHints: Array<timezoneList>,
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

interface data{
    timeZone: string,
    region: string,
}

 export interface timezoneList{
    id: number,
    city: string,
    region: string
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
        dataInString: DateTime.local().setLocale('en').toFormat('DDDD'),
        mainClockCity: 'Local',
        difference: 0,
        useLocalTime: true,
    },


} as clockState


export const fetchCityList = createAsyncThunk(
    "cityList",
    async () => {
        const response = await fetch(
            `http://worldtimeapi.org/api/timezone`
        );
        const data: any = await  response.json();
        return data;
    }
)

export const dataRetrievalOnRequest = createAsyncThunk(
    'dataRetrieval',
    async (someInfo: data ) => {
        const response = await fetch(
                `http://worldtimeapi.org/api/timezone/${someInfo.region}/${someInfo.timeZone}`
        );
        const data: any = await  response.json();
        const cityNameForRequest: string = someInfo.timeZone;
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
                console.log(payload)
                for(let i = 0; i < payload.length; i++){
                    payload[i] = payload[i].split("/");
                    if(payload[i].length == 2 && (payload[i][0] !== "Etc")){
                        payload[i][1] = payload[i][1].split("_");
                        payload[i][1] = payload[i][1].join(" ");
                        state.cityListForHints.push({
                            id: i, city: payload[i][1], region: payload[i][0] })
                    }
                }
                state.apiStatus = true;
            }

        })
        builder.addCase(dataRetrievalOnRequest.fulfilled, (state, {payload}) =>{
            console.log(payload);
            state.mainClock.useLocalTime = false;
            state.mainClock.mainClockCity = payload.cityNameForRequest;
            const date = +new Date();
            const date2  = +new Date(payload.data.datetime.split('.')[0]);
            console.log(date, date2, (date - date2) / (1000 * 60 * 60));
            state.mainClock.difference = Math.round((date - date2) / (1000 * 60 * 60));
            if (state.mainClock.difference < 0) {
                  state.mainClock.dataInString = DateTime.local().plus({hours: state.mainClock.difference * -1, minutes: 0}).setLocale('en').toFormat('DDDD')
            }else{
                state.mainClock.dataInString = DateTime.local().plus({hours: state.mainClock.difference, minutes: 0}).setLocale('en').toFormat('DDDD')
            }

            console.log(state.mainClock.difference , DateTime.local().plus({hours: state.mainClock.difference * -1, minutes: 0}).setLocale('en').toFormat('TT'));

        })
    })
})
export const {check, upDateClockDate, setDefaultTime} = clock.actions
export default clock.reducer