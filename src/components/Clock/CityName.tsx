import {BttnAdd} from "./BttnAdd";
import {ComebackHouse} from "./ComebackHouse";
import {useAppSelector} from "../../hooks/useTypedSelector";

export const CityName = () => {
    const cityName = useAppSelector((state) => state.Clock.mainClock)

    return (
        <div className='timezone-name__wrap'>
            <p className="timezone-name">
                <span className="timezone-name__region">{cityName.region}</span>
                <span className="timezone-name__city">{cityName.mainClockCity}</span></p>
            <div className="bttn-group">
                <ComebackHouse  />
                <BttnAdd />
            </div>
        </div>
    );
}

