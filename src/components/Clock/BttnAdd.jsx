import ButtonAdd from "./bttnAdd.svg";
import {useAppDispatch} from "../../hooks/useTypedSelector";

export function BttnAdd() {
    const dispatch = useAppDispatch();
    return <img  src={ButtonAdd} alt="" className="button-add" />;
}