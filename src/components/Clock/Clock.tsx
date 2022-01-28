import SearchPanel from './SearchPanel';
import MainClock from './MainClock';
import CityName from "./CityName";
import DateString from "./DateString";
import SavedTimeZones from "./SavedTimeZones";
import {dataRetrievalOnRequest, setDataGetTimezoneFromLink} from "../../store/setClockData";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/useTypedSelector";

const Clock = () => {
    const dispatch = useDispatch()
    const clockDate = useAppSelector((state) => state.Clock)
    const [searchParams, setSearchParams] = useSearchParams()

    function receiveCurrentLink(){
        let returnedObject
        if(searchParams.get("Timezone") !== null) {
            returnedObject = clockDate.cityListForHints.find((element) => {
                return element.city === searchParams.get("Timezone")
            })
            console.log(returnedObject);
            if (returnedObject) {
                dispatch(dataRetrievalOnRequest({
                    timeZone: returnedObject.city,
                    region: returnedObject.region,
                    id: returnedObject.id
                }))
            } else {
                console.log("error timezone")
                dispatch(setDataGetTimezoneFromLink(false))
                setSearchParams({})
            }
        }
    }

    function setLink(timezone: string) {
        setSearchParams({Timezone: timezone})
    }

    useEffect(() => {
        if(!searchParams.get("Timezone")){
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
        </div>
    );
};

export default Clock;
