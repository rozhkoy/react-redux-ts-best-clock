import React, {useEffect, useState, useRef} from "react";
import Timer from "../Timer/Timer";
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {upDateHours, upDateMinutes, upDateSecond} from "../../store/setTimerTime";
import {fetchCityList, check, dataRetrievalOnRequest} from "../../store/setClockData";
import Clock from "../Clock/Clock";



const TabsButton = () => {
  type NumberForTimer = {
    hours: number,
    minute: number,
    second: number,
    mili: number,
    currentMili: number,
  }
  const dispatch = useAppDispatch()
  const [selectedTab, setSelectedTab] = useState(1);
  const [stateTimer, setStateTimer] = useState(false);
  const endDate = useRef<number>(0);
  const startDate = useRef<Date>();
  const timerData = useAppSelector((state) => state.TimerDataSlice)
  const clockStore = useAppSelector((state) => state.clock);
  let calculateMili: NumberForTimer = {
    hours: 0,
    minute: 0,
    second: 0,
    mili: 0,
    currentMili: 0,
  };


  // timer

  function calculationDate() {
    startDate.current = new Date();
    calculateMili.mili = timerData.Hours * 60 * 60 * 1000 + timerData.Minutes * 60 * 1000 + timerData.Second * 1000;
    endDate.current = calculateMili.mili + Date.now();
  }

  function startTimer(){
    calculationDate();
    setStateTimer(true)
  }
  function stopTimer(){
    setStateTimer(false)
  }


  const apiRequest = () => dispatch(fetchCityList());

  if(!clockStore.apiStatus){
    apiRequest();
  }

  // end timer

  // clock
  function gettingDate(){


  }

  function showTime(){

  }


  useEffect( () =>{
    let interval: any;
    if (stateTimer) {
      interval = setInterval(() => {
        let resudualTime:any = new Date(endDate.current);
        calculateMili.currentMili = resudualTime - Date.now();
        console.log(calculateMili.currentMili);
        if (Math.floor(calculateMili.currentMili * 0.001) < 0) {
          clearInterval(interval);
          setStateTimer(false)
        }else {
          calculateMili.hours = Math.floor(calculateMili.currentMili / (1000 * 60 * 60))
          calculateMili.minute = Math.floor(calculateMili.currentMili / (1000 * 60)) - calculateMili.hours * 60;
          calculateMili.second = Math.floor(calculateMili.currentMili / 1000) - Math.floor(calculateMili.currentMili / (1000 * 60)) * 60;
          dispatch(upDateHours(calculateMili.hours))
          dispatch(upDateMinutes(calculateMili.minute))
          dispatch(upDateSecond(calculateMili.second))
        }
      }, 250);
    }
    return () => {
      clearInterval(interval);
    };
  })
  function test(){
    dispatch(dataRetrievalOnRequest("london"))
  }



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
  <button onClick={test}>dfdfdf</button>
        {selectedTab === 2 && <Timer startTimer={startTimer} stopTimer={stopTimer} />}
        {selectedTab ===1 && <Clock />}
    </div>
  );
};

export default TabsButton;
