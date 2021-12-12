import ClockSectionItem from './ClocksectionItem';
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";


const MainClock = () => {
    const time = useAppSelector((state) => state.clock.mainClock.time)
    const dispatch = useAppDispatch()

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

export default MainClock;
