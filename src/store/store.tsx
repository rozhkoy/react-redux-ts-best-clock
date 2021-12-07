import { configureStore} from "@reduxjs/toolkit";
import testS from "./setTimerTime"

// const rootReducer = combineReducers({
//     setTimerTime: setTimerTime,
// })

 export const store =  configureStore({
    reducer:{
        testSlice: testS
    }
})

export type RootState = ReturnType<typeof store.getState>

// export type RootState = ReturnType<typeof  rootReducer>;
// export const store = createStore(rootReducer)
