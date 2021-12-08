import TimerSectionItem from './TimerSectionItem';
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {decrementMinutes, decrementHours, decrementSecond, incrementHours, incrementSecond, incrementMinutes} from "../../store/setTimerTime";


const Timer = () => {
    const timerData = useAppSelector((state) => state.TimerDataSlice)
    const dispatch = useAppDispatch()

    function incrementHoursFunction(){
        dispatch(incrementHours())
    }

    function decrementHoursFunction(){
        dispatch(decrementHours())
    }

    function incrementMinutesFunction(){
        dispatch(incrementMinutes())
    }

    function decrementMinutesFunction(){
        dispatch(decrementMinutes())
    }

    function incrementSecondFunction(){
        dispatch(incrementSecond())
    }

    function decrementSecondFunction(){
        dispatch(decrementSecond())
    }

    return (
        <div className="wrap-timer">
            <div className="timer__section-group">
                <TimerSectionItem incrementNumber={incrementHoursFunction} decrementNumber={decrementHoursFunction} number={timerData.Hours}/>
                <span className="timer-colon">:</span>
                <TimerSectionItem incrementNumber={incrementMinutesFunction} decrementNumber={decrementMinutesFunction} number={timerData.Minutes}/>
                <span className="timer-colon">:</span>
                <TimerSectionItem incrementNumber={incrementSecondFunction} decrementNumber={decrementSecondFunction} number={timerData.Second}/>
            </div>
            <div className="timer-button__group">
                <button className="timer__button timer__button--start">
                    Start
                </button>
                <button className="timer__button timer__button--stop">
                    Stop
                </button>
                <button className="timer__button timer__button--reset">
                    Reset
                </button>
            </div>
        </div>
    );
};
export default Timer;
