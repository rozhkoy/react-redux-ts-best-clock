
import arrow from './arrow.svg';
import React from "react";

type Props = {
    number: number,
    incrementNumber: any,
    decrementNumber: any,
}
 const TimerSectionItem:React.FC<Props> = (props) :JSX.Element=> {

    return (
        <div className="timer__section-item">
            <button onClick={props.decrementNumber}  className="timer__button button__plus" >
                <img src={arrow} alt="" />
            </button>
            <span className="number__item">
                {props.number < 10 ? '0' + props.number : props.number}
            </span>
            <span className="number__desription">Hs</span>
            <button onClick={props.decrementNumber} className="timer__button button__minus" >
                <img src={arrow} alt="" />
            </button>
        </div>
    );
};
export default TimerSectionItem;
