import {BttnAdd} from "./BttnAdd";
import ComebackHouse from "./ComebackHouse";
import {useAppSelector} from "../../hooks/useTypedSelector";

function CityName() {
    const cityName = useAppSelector((state) => state.Clock.mainClock)

    return (
        <div className='wrap-city-name'>
            <p className="city-name">{ cityName.region + '/' + cityName.mainClockCity}</p>
            <div className="bttn-group">
                <ComebackHouse  />
                <BttnAdd />
            </div>
        </div>
    );
}

export default CityName;
