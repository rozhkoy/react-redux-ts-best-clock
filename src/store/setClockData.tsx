import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";

// interface

interface clockState {
    value: number,
    cityListForHints: Array<assortedCityList>,
    apiStatus: boolean,
}

interface assortedCityList {
    id: number,
    cityName: string,
}

// state

const initialClockState:clockState = {
    value: 20,
    cityListForHints: [],
    apiStatus: false,

} as clockState


export const fetchCityList = createAsyncThunk<any>(
    "cityList",
    async () => {
        const response = await fetch(
            `https://restcountries.com/v2/all`
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
    })
})
export const {check} = clock.actions
export default clock.reducer