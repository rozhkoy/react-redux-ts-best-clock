import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


interface typeStateTimerHoursMinutesSecond {
    value: any,

}

const initialState = {
    value: []
} as typeStateTimerHoursMinutesSecond


interface user {
    userID: number,
    id: number,
    title: string,
    completed: boolean
}

export const fetchTodos = createAsyncThunk<user[]>(
    "todos/fetch",
    async () => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos`
        );
        const data: user[] = await response.json();
        return data;

    }
);

export const test = createSlice({
    name: "tet",
    initialState,
    reducers: {
        incrementValue: (state) => {
            axios.get(`https://api.ipgeolocation.io/timezone?apiKey=1951161faacc41268be75b771f166a97&location=london`)
                .then(res => {
                    console.log(res)
                })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state, {payload}) => {
            console.log("loading");

        })
            builder.addCase(fetchTodos.fulfilled, (state, {payload}) => {
                console.log(payload)
                state.value = payload
            })
    }
})

export const {incrementValue} = test.actions;
export default test.reducer;



