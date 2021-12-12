import React from "react";

type Props = {
    timeInNumber: number,
    description: string
}

const ClockSectionItem:React.FC<Props>  = (props) :JSX.Element => {
    return (
        <div className="clock__section-item">
            <span className="numer__item"> {props.timeInNumber < 10 ? '0' + props.timeInNumber : props.timeInNumber}</span>
            <span className="number__desription">{props.description}</span>
        </div>
    );
};
export default ClockSectionItem;
