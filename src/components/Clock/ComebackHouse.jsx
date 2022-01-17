import comebackHomeImg from "./come-back-home.svg";
import {useAppDispatch} from "../../hooks/useTypedSelector";
import {switchToLocalTime} from "../../store/setClockData";

function ComebackHouse() {

    const dispatch = useAppDispatch();

    return (<div className="comeback-home">
        <img onClick={() => dispatch(switchToLocalTime())} src={comebackHomeImg} alt=""/>
    </div>)
}

export default ComebackHouse;