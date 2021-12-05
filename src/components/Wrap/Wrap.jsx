import { createContext, useRef, useState } from 'react';
import Popup from '../Popup/Popup';
import github from './github.svg';
export const ContextPopupMesseges = createContext();

const Wrap = (props) => {
    const [popupMesseges, setMesseges] = useState('');
    const child = useRef();
    const handleOnClick = () => {
        if (child.current) {
            child.current.showPopup();
        }
    };

    const showMesseges = (text) => {
        setMesseges(text);
        child.current.showPopup();
    };
    return (
        <ContextPopupMesseges.Provider value={showMesseges}>
            <div className="wrap">
                {props.children}
                <Popup ref={child} messeges={popupMesseges} />
                <a href="https://github.com/zolir18" class="link_github">
                    <img src={github} alt="" />
                </a>
            </div>
        </ContextPopupMesseges.Provider>
    );
};
export default Wrap;
