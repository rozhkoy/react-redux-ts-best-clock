import ClockSectionItem from './ClocksectionItem';


const MainClock = () => {
    return (
        <div className="clock__section-group">
            <ClockSectionItem/>
            <span className="clock-colon">:</span>
            <ClockSectionItem/>
            <span className="clock-colon">:</span>
            <ClockSectionItem/>
        </div>
    );
};

export default MainClock;
