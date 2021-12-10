import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";

// interface

interface clockState {
    value: number,
    cityListForHints: string[],
    cityListStatus: boolean,
    cityArray:Array<assortedCityList>
}

interface assortedCityList {
    id?: number,
    cityName?: string,
}

// state

const initialClockState:clockState = {
    value: 20,
    cityListForHints: [],
    cityListStatus: false,
    cityArray: []
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
            for (let i = 0; i < payload.length ; i++) {
                let obj: assortedCityList  = {}
                obj.id = state.cityArray.length;
                obj.cityName = payload[i].capital;
                if ('capital' in payload[i]) {
                    console.log(obj);
                    state.cityArray.push(obj)
                }
            }
            console.table(current(state.cityArray));
        })
    })
})
export const {check} = clock.actions
export default clock.reducer