
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {
    dataRetrievalOnRequest,
    fetchCityList,
    fetchLocalTimezona,
    timezoneList
} from "../../store/setClockData";
import {showPopup} from "../../store/setPopupState";

type Props = {
    setLink: any
}

export const SearchPanel:React.FC<Props> = (props):JSX.Element  => {
    const dispatch = useAppDispatch();
    const clockStore = useAppSelector((state) => state.Clock);
    const resultListArray = useRef<Array<HTMLElement>>([]);
    const currentRow = useRef<number>(-1);
    const [enteredText, setEnteredText] = useState('');
    const hintsList = useRef<HTMLUListElement>(null);
    const [selectState, setSelectState] = useState(true);
    const [resultsList, setResultList] = useState<Array<timezoneList>>([]);
    const refInput = useRef<HTMLInputElement>(null);

    interface KeyboardEvent {
        keyCode: number;
    }

    function updateInput(event: ChangeEvent<HTMLInputElement> ) {
        if(currentRow.current >= 0){
            if(resultListArray.current[currentRow.current].classList.contains('active__list')){
                resultListArray.current[currentRow.current].classList.remove('active__list');
            }
        }
        setEnteredText(event.target.value);
        createHintsList(event.target.value);
        currentRow.current = -1;
        setSelectState(true)
    }

    function changeInputData(index: number) {
        if (selectState && resultsList.length > 0) {
            currentRow.current = index;
            setSelectState(true);
        }
    }

    function selectionHints(event: KeyboardEvent) {
        if (event.keyCode === 13 && currentRow.current >= 0) {
            apiRequestDate(resultsList[currentRow.current].city, resultsList[currentRow.current].region, resultsList[currentRow.current].id);
            props.setLink(resultsList[currentRow.current].city)
            if(currentRow.current >= 0){
                if(resultListArray.current[currentRow.current].classList.contains('active__list')){
                    resultListArray.current[currentRow.current].classList.remove('active__list');
                }
            }
        }

        if (selectState && resultsList.length !== 0) {
            if (event.keyCode === 40) {
                resultListArray.current[resultsList.length - 1].classList.remove('active__list');
                currentRow.current++;
                if (currentRow.current >= resultsList.length) {
                    currentRow.current = -1;
                    changeInputData(currentRow.current);
                }
                if (resultListArray.current[currentRow.current]) {
                    resultListArray.current[currentRow.current].classList.add('active__list');
                    resultListArray.current[currentRow.current].scrollIntoView(false)
                    changeInputData(currentRow.current);
                    if (resultListArray.current[currentRow.current - 1]) {
                        resultListArray.current[currentRow.current - 1 ].classList.remove('active__list');
                    }
                }
            }
            if (event.keyCode === 38) {
                currentRow.current--;
                if (currentRow.current < -1) {
                    currentRow.current = resultsList.length - 1;
                    resultListArray.current[0].classList.remove('active__list');
                }
                if (currentRow.current === -1) {
                    changeInputData(currentRow.current);
                    currentRow.current = resultsList.length;
                    resultListArray.current[0].classList.remove('active__list');
                }
                if (resultListArray.current[currentRow.current]) {
                    resultListArray.current[currentRow.current].classList.add('active__list');
                    resultListArray.current[currentRow.current].scrollIntoView(false)
                    changeInputData(currentRow.current);
                    if (resultListArray.current[currentRow.current + 1]) {
                        resultListArray.current[currentRow.current + 1].classList.remove('active__list');
                    }
                }
            }
        }
    }

    function createHintsList(text: string) {
            let regex = new RegExp(`^${text}`, 'im');
            let newResultList: timezoneList[] = [];
            for (let i = 0; i < clockStore.cityListForHints.length; i++) {
                if (regex.test(clockStore.cityListForHints[i].city)) {
                    newResultList.push({
                        id: clockStore.cityListForHints[i].id,
                        city: `${clockStore.cityListForHints[i].city}`,
                        region: `${clockStore.cityListForHints[i].region}`
                    });
                }
            }
            setResultList(newResultList);
        }

    function apiRequestDate(city: string, region: string, regionID: number) {
        if(city === clockStore.mainClock.mainClockCity){
            dispatch(showPopup("You have already selected this time zone"))
        } else {
            dispatch(dataRetrievalOnRequest({timeZone: city, region: region, id: regionID}))
        }
    }

    useEffect(() => {
            if(!clockStore.apiStatusHintList){
                dispatch(fetchCityList())
            }
            if(!clockStore.apiStatusLocalTime && !clockStore.mainClock.getTimezoneFromLink) {
                dispatch(fetchLocalTimezona())
            }
            if(clockStore.apiStatusHintList && enteredText.length <= 0){
                setResultList(clockStore.cityListForHints)
            }
        }, [clockStore.mainClock.getTimezoneFromLink, clockStore.apiStatusLocalTime, clockStore.apiStatusHintList, clockStore.cityListForHints]);

    return (
        <div className="search">
            <div className="input__wrap">
            <input type="text" ref={refInput} className="search__input"
                   placeholder="Search by city name" onKeyDown={selectionHints} value={enteredText}
                   onChange={updateInput}/>
            </div>

            <ul className="search__result" ref={hintsList}>
                {resultsList.map((Item, index: number) => (<li
                    ref={(elRef: HTMLLIElement) => {resultListArray.current[index] = elRef;}}
                    onClick={() =>{
                        console.log(currentRow)
                        if(currentRow.current >= 0) {
                            console.log(currentRow)
                            if (resultListArray.current[currentRow.current].classList.contains('active__list')) {
                                resultListArray.current[currentRow.current].classList.remove('active__list');
                                currentRow.current = -1
                            } else {
                                currentRow.current = 0;
                            }
                        }
                        apiRequestDate(Item.city, Item.region, Item.id);
                        props.setLink(Item.city)
                    }}
                    key={Item.id}>
                    <span className="search__city"> {Item.city}</span>
                    <span className="search__region"> {Item.region}</span>
                </li>))}
            </ul>
        </div>
    );
};