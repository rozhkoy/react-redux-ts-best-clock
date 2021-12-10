import React from 'react';
import './App.css';
import Popup from "./components/Popup/Popup";
import TabsButton from "./components/TabsButton/TabsButton";
import {useAppSelector} from "./hooks/useTypedSelector";



export function App() {

    const count = useAppSelector((state) => state.TimerDataSlice)
    console.log(count)


    return (
        <div className="wrap">
            <TabsButton/>
            <Popup/>
        </div>
    );
}

export default App