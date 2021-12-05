
const storeDefault: typeStateTimerHoursMinutesSecond = {
    Hours: 0,
    Minutes: 0,
    Second: 0,
}

interface typeStateTimerHoursMinutesSecond{
    Hours: number,
    Minutes: number,
    Second: number,
}

interface actionSetTimerState{
    type: string,

}


 export const setTimerTime = (state = storeDefault, action:actionSetTimerState): typeStateTimerHoursMinutesSecond  => {
    switch (action.type){
        case "plus":
            console.log("plus")
            return state
        case "minus":
            console.log("minus")
            return state
        default:
            return state

    }
}
