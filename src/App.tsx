import React from 'react';
import './App.css';
import Popup from "./components/Popup/Popup";
import TabsButton from "./components/TabsButton/TabsButton";
import {useAppDispatch, useAppSelector} from "./hooks/useTypedSelector";
import {increment} from "./store/setTimerTime";


export function App() {

    const count = useAppSelector((state) => state.testSlice)
    console.log(count)
    const dispatch = useAppDispatch()
    function hendelClick(){
        dispatch(increment(3))
    }

    return (
        <div className="wrap">
            <TabsButton/>
            <Popup/>
            dfdfdfdf{count.Hours}
            <button onClick={hendelClick}>dfd</button>
        </div>
    );
}

export default App