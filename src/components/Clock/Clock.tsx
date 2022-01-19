import SearchPanel from './SearchPanel';
import MainClock from './MainClock';
import CityName from "./CityName";
import DateString from "./DateString";
import SavedTimeZones from "./SavedTimeZones";

const Clock = () => {

    return (
        <div className="wrap-clock">
            <SearchPanel />
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
