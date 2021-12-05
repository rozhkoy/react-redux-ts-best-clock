import { useRef, forwardRef, useImperativeHandle } from 'react';

const Popup = forwardRef((props, ref) => {
    const popupState = useRef(false);
    const controlPopup = useRef(null);
    let delayPopup;
    let delayAnimation;
    useImperativeHandle(ref, () => ({
        showPopup() {
            clearTimeout(delayAnimation);
            clearTimeout(delayPopup);
            controlPopup.current.classList.add('visibal-block');
            popupState.current = true;
            delayAnimation = setTimeout(() => {
                controlPopup.current.classList.add('anima');
                delayPopup = setTimeout(() => {
                    controlPopup.current.classList.remove('visibal-block');
                    controlPopup.current.classList.remove('anima');
                }, 200);
            }, 1500);
        },
    }));

    return (
        <div ref={controlPopup} className="popup">
            <p className="popup__text">{props.messeges}</p>
        </div>
    );
});

export default Popup;
