import TimerSectionItem from './TimerSectionItem';

const Timer = () => {
    return (
        <div className="wrap-timer">
            <div className="timer__section-group">
                <TimerSectionItem/>
                <span className="timer-colon">:</span>
                <TimerSectionItem/>
                <span className="timer-colon">:</span>
                <TimerSectionItem/></div>
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
