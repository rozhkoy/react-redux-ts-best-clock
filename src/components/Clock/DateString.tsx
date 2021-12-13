import {useAppSelector} from "../../hooks/useTypedSelector";

const DateString = () => {
    const dateInString = useAppSelector((state) => state.clock.mainClock.dataInString)
    return (
        <div>
            <p className="clock__date">{dateInString}</p>
        </div>
    );
};

export default DateString;
