import ButtonAdd from "./bttnAdd.svg";
import {useAppDispatch} from "../../hooks/useTypedSelector";
import {addTimeZoneInList} from "../../store/setClockData";

export function BttnAdd() {
    const dispatch = useAppDispatch();
    return <img onClick={() => {dispatch(addTimeZoneInList())}} src={ButtonAdd} alt="" className="button-add" />;
}