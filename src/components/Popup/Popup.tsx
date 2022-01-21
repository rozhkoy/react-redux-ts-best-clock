import {useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {hidePopup} from "../../store/setPopupState";

const Popup = () => {
    const dispatch = useAppDispatch();
    const popupStore = useAppSelector((state) => state.Popup);
    const refPopup = useRef<HTMLDivElement>(null);
    if(popupStore.show) {
        refPopup.current?.classList.add('visible-block');
         setTimeout(() => {
            refPopup.current?.classList.remove('visible-block');
                dispatch(hidePopup())
        }, 1500);
    }

    return (
        <div ref={refPopup} className="popup">
            <p className="popup__text">{popupStore.message}</p>
        </div>
    );
};

export default Popup;
