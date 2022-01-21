import { useRef } from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {hidePopup} from "../../store/setPopupState";

const Popup = () => {
    const dispatch = useAppDispatch();
    const popupStore = useAppSelector((state) => state.Popup);
    const popupState = useRef<boolean>(false);
    const controlPopup = useRef<any>();
    let delayPopup: any;
    let delayAnimation: any;
    console.log(popupStore)
    if(popupStore.show) {
        clearTimeout(delayAnimation);
        clearTimeout(delayPopup);
        controlPopup.current.classList.add('visibal-block');
        popupState.current = true;
        delayAnimation = setTimeout(() => {
            controlPopup.current.classList.add('anima');
            delayPopup = setTimeout(() => {
                controlPopup.current.classList.remove('visibal-block');
                controlPopup.current.classList.remove('anima');
                dispatch(hidePopup())
            }, 200);
        }, 1500);
    }




    return (
        <div ref={controlPopup} className="popup">
            <p className="popup__text">{popupStore.message}</p>
        </div>
    );
};

export default Popup;
