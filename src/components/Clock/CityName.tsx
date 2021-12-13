import {BttnAdd} from "./BttnAdd";
import ComebackHouse from "./ComebackHouse";
import {useAppSelector} from "../../hooks/useTypedSelector";


function CityName() {
    const cityName = useAppSelector((state) => state.clock.mainClock.mainClockCity)

    return (
        <div className='wrap-city-name'>
            <p className="city-name">{cityName}</p>
            <div className="bttn-group">
                <ComebackHouse  />
                <BttnAdd />
            </div>
        </div>);
}

export default CityName;
