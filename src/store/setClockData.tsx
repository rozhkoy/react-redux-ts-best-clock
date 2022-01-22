import {createAsyncThunk, createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {DateTime} from "luxon";



// interface

interface clockState {
    value: number,
    cityListForHints: Array<timezoneList>,
    apiStatusHintList: boolean,
    apiStatusLocalTime: boolean,
    mainClock: mainClocKI,
    addedTimezoneInList: Array<savedTimezone>,
}

interface mainClocKI{
    time: TimeHoursMinutesSecond,
    dataInString: string,
    mainClockCity: string,
    difference: number,
    useLocalTime: boolean,
    timezoneID: number,
    region: string
}

interface TimeHoursMinutesSecond{
    hours: number,
    minutes: number,
    seconds: number,
    fullTime: Array<string>
}

interface data{
    timeZone: string,
    region: string,
    id: number,
}

 export interface timezoneList{
    id: number,
    city: string,
    region: string
}

export interface savedTimezone{
    id: number,
    city: string,
    region: string,
    difference: number,
    timeIn: string
}

const initialClockState:clockState = {
    value: 20,
    cityListForHints: [],
    apiStatusHintList: false,
    apiStatusLocalTime: false,
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
        timezoneID: -1,
        region: ""
    },
    addedTimezoneInList: []
}

export const fetchLocalTimezona = createAsyncThunk(
    "fetchLocalTimezona",
    async function foo(): Promise<any> {
        try{
            const response =  await fetch(`http://worldtimeapi.org/api/ip`);
            return  await  response.json();
        }catch (e){
            return foo()
        }
    }
)

export const fetchCityList = createAsyncThunk(
    "cityList",
     async function foo(): Promise<any> {
         try{
            const response =  await fetch(`http://worldtimeapi.org/api/timezone`);
            return  await  response.json();
         }catch (e){
             return foo()
         }
    }
)

export const dataRetrievalOnRequest = createAsyncThunk(
    'dataRetrieval',
    async function foo(someInfo: data):Promise<any> {
        try{
            const response =  await fetch(`http://worldtimeapi.org/api/timezone/${someInfo.region}/${someInfo.timeZone.split(" ").join("_")}`);
            const data: any = await  response.json();
            const timezoneID = someInfo.id;
            const cityNameForRequest: string = someInfo.timeZone;
            const regionTimezone =  someInfo.region;
            return {data , cityNameForRequest, timezoneID, regionTimezone};
        }catch (e){
            return foo(someInfo)
        }
    }
)

export const clock = createSlice({
    name: "clock",
    initialState: initialClockState,
    reducers: {
        check: (state) => {
            console.log(state.cityListForHints);
        },
        setDefaultTime: (state) => {
                state.mainClock.time.fullTime = DateTime.local().plus({
                    hours: state.mainClock.difference * -1,
                    minutes: 0
                }).setLocale('en').toFormat('TT').split(":");
                state.mainClock.time.hours = Number(state.mainClock.time.fullTime[0])
                state.mainClock.time.minutes = Number(state.mainClock.time.fullTime[1])
                state.mainClock.time.seconds = Number(state.mainClock.time.fullTime[2])
        },
        addTimeZoneInList: (state, action) => {
            state.addedTimezoneInList.push(action.payload)
        },
        switchStateApiStatus: (state) => {
            state.apiStatusHintList = false
        },
        removeFromInList: (state,action: any ) => {
            state.addedTimezoneInList = state.addedTimezoneInList.filter((elem) => {
                return  elem.id !== action.payload
            })
        },
        changeTimezoneFromSaved: (state, action: any) => {
            state.mainClock.timezoneID = action.payload.id
            state.mainClock.mainClockCity = action.payload.timezone
            state.mainClock.region = action.payload.region
            state.mainClock.difference = action.payload.diff
        },
        upDateTimeInSavedTimezone: (state) => {
            for(let i =  0; i < state.addedTimezoneInList.length; i++){
                let time = DateTime.local().plus({
                    hours: state.addedTimezoneInList[i].difference * -1,
                    minutes: 0
                }).setLocale('en').toFormat('TT').split(":");
                state.addedTimezoneInList[i].timeIn = `${time[0]}:${time[1]}`;
            }
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCityList.fulfilled, (state, {payload}) => {
            if(!state.apiStatusHintList) {
                for(let i = 0; i < payload.length; i++){
                    payload[i] = payload[i].split("/");
                    if(payload[i].length == 2 && (payload[i][0] !== "Etc")){
                        payload[i][1] = payload[i][1].split("_");
                        payload[i][1] = payload[i][1].join(" ");
                        state.cityListForHints.push({id: i, city: payload[i][1], region: payload[i][0]})
                    }
                }
                state.apiStatusHintList = true;
            }
        })
        builder.addCase(dataRetrievalOnRequest.fulfilled, (state, {payload}) =>{
            state.mainClock.useLocalTime = false;
            state.mainClock.mainClockCity = payload.cityNameForRequest;
            state.mainClock.timezoneID = payload.timezoneID;
            state.mainClock.region = payload.regionTimezone;
            const date = +new Date();
            const date2  = +new Date(payload.data.datetime.split('.')[0]);
            state.mainClock.difference = Math.round((date - date2) / (1000 * 60 * 60));
            state.mainClock.dataInString = DateTime.local().plus({hours: state.mainClock.difference * -1, minutes: 0}).setLocale('en').toFormat('DDDD')
        })
        builder.addCase(fetchLocalTimezona.fulfilled, (state, {payload}) =>{
            state.mainClock.useLocalTime = true;
            state.mainClock.mainClockCity = payload.timezone.split("/")[1] ;
            state.mainClock.region = payload.timezone.split("/")[0];
            state.mainClock.timezoneID = -1;
            state.mainClock.difference = 0;
            state.apiStatusLocalTime = true;
        })
    })
})
export const {check, setDefaultTime, addTimeZoneInList, switchStateApiStatus, removeFromInList, changeTimezoneFromSaved, upDateTimeInSavedTimezone} = clock.actions
export default clock.reducer