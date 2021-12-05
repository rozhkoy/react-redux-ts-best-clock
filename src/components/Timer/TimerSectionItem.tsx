
import arrow from './arrow.svg';

const TimerSectionItem = () => {

    return (
        <div className="timer__section-item">
            <button className=" timer__button button__plus" >
                <img src={arrow} alt="" />
            </button>
            <span className="numer__item">
                {/*{indicator < 10 ? '0' + indicator : indicator}*/}
                10
            </span>
            <span className="number__desription">Hs</span>
            <button className=" timer__button button__minus" >
                <img src={arrow} alt="" />
            </button>
        </div>
    );
};
export default TimerSectionItem;
