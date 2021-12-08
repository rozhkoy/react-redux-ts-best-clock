import React from 'react';
import './App.css';
import Popup from "./components/Popup/Popup";
import TabsButton from "./components/TabsButton/TabsButton";
import {useAppDispatch, useAppSelector} from "./hooks/useTypedSelector";
import {incrementMinutes, decrementMinutes} from "./store/setTimerTime";


export function App() {

    const count = useAppSelector((state) => state.TimerDataSlice)
    console.log(count)
    const dispatch = useAppDispatch()
    function hendelClick(){
        dispatch(incrementMinutes())
    }

    function hendelClickMinus(){
        dispatch(decrementMinutes())
    }

    return (
        <div className="wrap">
            <TabsButton/>
            <Popup/>
            dfdfdfdf{count.Minutes}
            <button onClick={hendelClick}>dfd</button>
            <button onClick={hendelClickMinus}>dfd</button>

        </div>
    );
}

export default App