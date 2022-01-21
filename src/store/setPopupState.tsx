import {createSlice} from "@reduxjs/toolkit";


export interface popupStore {
    message: string,
    show: boolean,
}

const  initialPopupState:popupStore = {
    message: "",
    show: false,
}

export const Popup = createSlice({
    name: "popup",
    initialState: initialPopupState,
    reducers: {
        showPopup: (state, action) => {
            state.message = action.payload
            state.show = true
        },
        hidePopup: (state) => {
            state.show = false
            console.log("red")
        }

    }
})

export const { hidePopup, showPopup} = Popup.actions
export default Popup.reducer
