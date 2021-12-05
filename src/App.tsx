import React from 'react';
import './App.css';
import Popup from "./components/Popup/Popup";
import TabsButton from "./components/TabsButton/TabsButton";


export function App() {
    return (
        <div className="wrap">
            <TabsButton/>
            <Popup/>
        </div>
    );
}

export default App