import {ClockSectionItem} from './ClocksectionItem';
import {useAppSelector} from "../../hooks/useTypedSelector";

export const MainClock = () => {
    const time = useAppSelector((state) => state.Clock.mainClock.time)

    return (
        <div className="clock__section-group">
            <ClockSectionItem timeInNumber={time.hours} description={"Hs"}/>
            <span className="clock-colon">:</span>
            <ClockSectionItem timeInNumber={time.minutes} description={"Min"}/>
            <span className="clock-colon">:</span>
            <ClockSectionItem timeInNumber={time.seconds} description={"Sec"}/>
        </div>
    );
};

