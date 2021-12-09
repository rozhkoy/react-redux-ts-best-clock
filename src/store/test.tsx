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

export const fetchTodos = createAsyncThunk<any>(
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

export const {} = test.actions;
export default  test.reducer



