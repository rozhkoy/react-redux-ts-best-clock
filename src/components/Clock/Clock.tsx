import SearchPanel from './SearchPanel';
import MainClock from './MainClock';
import CityName from "./CityName";
import DateString from "./DateString";
import SavedTimeZones from "./SavedTimeZones";
import {dataRetrievalOnRequest, setDataGetTimezoneFromLink} from "../../store/setClockData";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {createSearchParams, useLocation, useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/useTypedSelector";
import {showPopup} from "../../store/setPopupState";

const Clock = () => {
    const dispatch = useDispatch()

    const clockDate = useAppSelector((state) => state.Clock)
    const [searchParams, setSearchParams] = useSearchParams()

    function receiveCurrentLink(){
        let returnedObject
        if(searchParams.get("timezone")) {
            returnedObject = clockDate.cityListForHints.find((element) => {
                return element.city === searchParams.get("timezone")
            })
            if (returnedObject) {
                dispatch(dataRetrievalOnRequest({
                    timeZone: returnedObject.city,
                    region: returnedObject.region,
                    id: returnedObject.id
                }))
            } else {
                // dispatch(showPopup("Time zone not found");
                // dispatch(setDataGetTimezoneFromLink(false))
            }
        }
        console.log(searchParams.get("timezone"))
    }

    function setLink(timezone: string) {
        setSearchParams({timezone: timezone})
    }

    useEffect(() => {
        if(!searchParams.get("timezone")){
            dispatch(setDataGetTimezoneFromLink(false))
        }
        if(clockDate.cityListForHints.length > 0, clockDate.mainClock.getTimezoneFromLink){
            console.log(clockDate.cityListForHints.length);
            receiveCurrentLink()
        }
    }, [clockDate.cityListForHints, clockDate.mainClock.getTimezoneFromLink])

    return (
        <div className="wrap-clock">
            <SearchPanel setLink={setLink} />
            <div className="clock__show-info">
                <CityName />
                <MainClock />
                <DateString />
                <SavedTimeZones />
            </div>
            <button onClick={receiveCurrentLink}>dfdf</button>
        </div>
    );
};

export default Clock;
