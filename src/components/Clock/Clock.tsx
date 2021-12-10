import SearchPanel from './SearchPanel';
import MainClock from './MainClock';



const Clock = () => {

    return (
        <div className="wrap-clock">
            <SearchPanel />
            {/*<CityName cityName={props.cityName} addCityInList={props.addCityInList}*/}
            {/*          comebackHouse={props.comebackHouse}/>*/}
            <MainClock />
            {/*<DateString dateString={props.dateString}/>*/}
            {/*<SavedTimeZones deleteSavedCity={props.deleteSavedCity} savedCity={props.savedCity}*/}
            {/*                searchBySavedCity={props.searchBySavedCity}/>*/}

        </div>
    );
};
export default Clock;
