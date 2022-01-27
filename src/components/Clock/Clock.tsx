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
        console.log("df");
        let returnedObject
        if(searchParams.get("timezone") !== null) {
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
                dispatch(setDataGetTimezoneFromLink(false))
                setSearchParams({})
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
        if(clockDate.cityListForHints.length > 0 && clockDate.mainClock.getTimezoneFromLink){
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
