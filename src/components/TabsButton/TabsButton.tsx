import {useState} from "react";
import Timer from "../Timer/Timer";




const TabsButton = () => {
  const [selectedTab, setSelectedTab] = useState(2);

  return (
    <div className="timer">
      <div className="tabs">
        <button  className="timer__button tabs__button " onClick={() => setSelectedTab(1)}>
          CLOCK
        </button>
        <button  className="timer__button tabs__button " onClick={() => setSelectedTab(2)}>
          TIMER
        </button>
      </div>

        {selectedTab === 2 && <Timer />}
    </div>
  );
};

export default TabsButton;
