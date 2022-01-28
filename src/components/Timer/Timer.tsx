import {TimerSectionItem} from './TimerSectionItem';
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {
    decrementMinutes,
    decrementHours,
    decrementSecond,
    incrementHours,
    incrementSecond,
    incrementMinutes,
    upDateHours, upDateMinutes, upDateSecond, setStateTimer
} from "../../store/setTimerTime";
import React from "react";
import {showPopup} from "../../store/setPopupState";

type Props = {
    startTimer: () => void,
    stopTimer: () => void,
}

const Timer:React.FC<Props> = (props):JSX.Element => {
    const timerData = useAppSelector((state) => state.TimerDataSlice)
    const dispatch = useAppDispatch()

    function incrementHoursFunction() {
        if(timerData.stateTimer){
            dispatch(showPopup("Timer started. Stop the timer and set the time"));
        } else {
            dispatch(incrementHours())
        }
    }

    function decrementHoursFunction() {
        if (timerData.stateTimer) {
            dispatch(showPopup("Timer started. Stop the timer and set the time"));
        } else {
            dispatch(decrementHours())
        }
    }

    function incrementMinutesFunction() {
        if(timerData.stateTimer){
            dispatch(showPopup("Timer started. Stop the timer and set the time"));
        } else {
            dispatch(incrementMinutes())
        }
    }

    function decrementMinutesFunction() {
        if(timerData.stateTimer){
            dispatch(showPopup("Timer started. Stop the timer and set the time"));
        } else {
            dispatch(decrementMinutes())
        }
    }

    function incrementSecondFunction() {
        if(timerData.stateTimer){
            dispatch(showPopup("Timer started. Stop the timer and set the time"));
        } else {
            dispatch(incrementSecond())
        }
    }

    function decrementSecondFunction() {
        if(timerData.stateTimer){
            dispatch(showPopup("Timer started. Stop the timer and set the time"));
        } else {
            dispatch(decrementSecond())
        }
    }

    function startTimer() {
        if(timerData.Hours !== 0 || timerData.Second !== 0 || timerData.Minutes !== 0) {
            if (timerData.stateTimer) {
                dispatch(showPopup("Timer already started"));
            } else {
                props.startTimer()
            }
        } else {
            dispatch(showPopup("Set the time for the timer"));
        }
    }

    function stopTimer() {
        if(!timerData.stateTimer) {
            dispatch(showPopup("Timer already stoped"));
        } else {
            props.stopTimer()
        }
    }

    function reset() {
        dispatch(setStateTimer(false))
        dispatch(upDateHours(0))
        dispatch(upDateMinutes(0))
        dispatch(upDateSecond(0))
    }

    return (
        <div className="wrap-timer">
            <div className="timer__section-group">
                <TimerSectionItem incrementNumber={incrementHoursFunction} decrementNumber={decrementHoursFunction} description={"Hs"} number={timerData.Hours}/>
                <span className="timer-colon">:</span>
                <TimerSectionItem incrementNumber={incrementMinutesFunction} decrementNumber={decrementMinutesFunction} description={"Min"} number={timerData.Minutes}/>
                <span className="timer-colon">:</span>
                <TimerSectionItem incrementNumber={incrementSecondFunction} decrementNumber={decrementSecondFunction} description={"Sec"} number={timerData.Second}/>
            </div>
            <div className="timer-button__group">
                <button onClick={startTimer} className="timer__button timer__button--start">
                    Start
                </button>
                <button onClick={stopTimer} className="timer__button timer__button--stop">
                    Stop
                </button>
                <button onClick={reset} className="timer__button timer__button--reset">
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Timer;
