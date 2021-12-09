import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// interface

interface clockState {
    value: number,
    cityListForHints: [],
    cityListStatus: boolean,
}

interface assortedCityList {
    id?: number,
    cityName?: string,
}

// state

const initialClockState = {
    value: 20,
    cityListForHints: [],
    cityListStatus: false,
} as clockState


export const fetchCityList = createAsyncThunk<any>(
    "cityList",
    async () => {
        const response = await fetch(
            `https://restcountries.com/v2/all`
        );
        const data: any = await response.json();
        const cityArray:Array<assortedCityList> = [];
        let obj: assortedCityList  = {}
        console.log(data);
        for (let i = 0; i < 10; i++) {
            if ('capital' in data[i]) {
                obj.id = i;
                obj.cityName = data[i].capital;
                console.log(obj);
                cityArray.push(obj)
                console.log(cityArray);
            }
        }
        return obj
    }
)


export const clock = createSlice({
    name: "clock",
    initialState: initialClockState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchCityList.fulfilled, (state, {payload}) => {
            
        })
    })
})

export default clock.reducer