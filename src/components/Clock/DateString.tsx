import {useAppSelector} from "../../hooks/useTypedSelector";

export const DateString = () => {
    const dateInString = useAppSelector((state) => state.Clock.mainClock.dataInString)

    return (
        <div>
            <p className="clock__date">{dateInString}</p>
        </div>
    );
};

