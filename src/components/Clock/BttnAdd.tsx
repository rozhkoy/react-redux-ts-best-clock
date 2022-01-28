import ButtonAdd from "./bttnAdd.svg";
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {addTimeZoneInList} from "../../store/setClockData";
import {showPopup} from "../../store/setPopupState";

export  const BttnAdd = () => {
    const dispatch = useAppDispatch();
    const clockState = useAppSelector((state) => state.Clock)
    function addTimezone(){
        let check = clockState.addedTimezoneInList.find((elem) => {
            return elem.id === clockState.mainClock.timezoneID
        })
        if (check === undefined) {
            dispatch(addTimeZoneInList({
                id: clockState.mainClock.timezoneID,
                city: clockState.mainClock.mainClockCity,
                region: clockState.mainClock.region,
                difference: clockState.mainClock.difference,
                timeIn: `${clockState.mainClock.time.fullTime[0]}:${clockState.mainClock.time.fullTime[1]}`
            }))
        } else {
            dispatch(showPopup("This time zone in list"))
        }
    }

    return <img onClick={addTimezone} src={ButtonAdd} alt="" className="button-add" />;
}

