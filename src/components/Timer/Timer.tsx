import TimerSectionItem from './TimerSectionItem';
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {decrementMinutes, incrementMinutes} from "../../store/setTimerTime";
import {useDispatch} from "react-redux";

const Timer = () => {
    const timerData = useAppSelector((state) => state.TimerDataSlice)
    const dispatch = useAppDispatch()
    function incrementMinutesFucntion(){
        dispatch(decrementMinutes())
    }

    return (
        <div className="wrap-timer">
            <div className="timer__section-group">
                <TimerSectionItem foo={incrementMinutesFucntion} number={timerData.Hours}/>
                <span className="timer-colon">:</span>
                <TimerSectionItem foo={} number={timerData.Minutes}/>
                <span className="timer-colon">:</span>
                <TimerSectionItem foo={} number={timerData.Second}/>
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
