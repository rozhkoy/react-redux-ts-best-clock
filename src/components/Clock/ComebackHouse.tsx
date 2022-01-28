import comebackHomeImg from "./come-back-home.svg";
import {useAppDispatch} from "../../hooks/useTypedSelector";
import {fetchLocalTimezona} from "../../store/setClockData";

export  const ComebackHouse = () => {
    const dispatch = useAppDispatch();

    return(
        <div className="comeback-home">
            <img onClick={() => dispatch(fetchLocalTimezona())} src={comebackHomeImg} alt=""/>
        </div>
    )
}
