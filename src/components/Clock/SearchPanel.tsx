
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {dataRetrievalOnRequest, timezoneList} from "../../store/setClockData";
const SearchPanel = () => {
    const dispatch = useAppDispatch();
    const clockStore = useAppSelector((state) => state.clock);
    const resultListArray = useRef<Array<HTMLElement>>([]);
    const currentRow = useRef<number>(-1);
    const searchData = useRef<any>({enteredText: ''});
    const [enteredText, setEnteredText] = useState('');
    const hintsList = useRef<any>(null);
    const [selectState, setSelectState] = useState(true);
    const [resultsList, setResultList] = useState<Array<timezoneList>>([]);

    const refInput = useRef<any>();
    const domNode = useRef<any>();
    interface KeyboardEvent {
        keyCode: number;
    }



    function updateInput(event: ChangeEvent<HTMLInputElement> ) {
        let temporally = event.target.value;
        searchData.current.enteredText = temporally;
        createHintsList(temporally);
        setEnteredText(temporally);
        currentRow.current = -1;
        setSelectState(true)
    }

    function changeInputData(index: number, last: boolean) {
        console.log(index, selectState);
        if (selectState && resultsList.length > 0) {
            currentRow.current = index;
            if (last === true && index === -1) {
                setEnteredText(searchData.current.enteredText);
            } else if (last === true && index === resultsList.length) {
                setEnteredText(searchData.current.enteredText);
            } else {
                let offerResult = resultsList[index].city;
                setEnteredText(offerResult);
            }
            setSelectState(true);
        }
    }

    function selectionHints(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            apiRequestDate();
        }

        if (selectState) {
            if (event.keyCode === 40) {
                resultListArray.current[resultsList.length - 1].classList.remove('active__list');
                currentRow.current++;
                if (currentRow.current >= resultsList.length) {
                    currentRow.current = -1;
                    changeInputData(currentRow.current, true);
                }
                if (resultListArray.current[currentRow.current]) {
                    resultListArray.current[currentRow.current].classList.add('active__list');
                    resultListArray.current[currentRow.current].scrollIntoView(false)
                    changeInputData(currentRow.current, false);
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
                    changeInputData(currentRow.current, true);
                    currentRow.current = resultsList.length;
                    resultListArray.current[0].classList.remove('active__list');
                }

                if (resultListArray.current[currentRow.current]) {
                    resultListArray.current[currentRow.current].classList.add('active__list');
                    resultListArray.current[currentRow.current].scrollIntoView(true)
                    changeInputData(currentRow.current, false);
                    if (resultListArray.current[currentRow.current + 1]) {
                        resultListArray.current[currentRow.current + 1].classList.remove('active__list');
                    }
                }
            }
        }
    }

    function createHintsList(text: string) {

        if (enteredText.length <= 0) {
            setResultList(clockStore.cityListForHints)
        } else {
            let regex = new RegExp(`^${text}`, 'im');
            let newID = 0;
            let newResultList: timezoneList[] = [];
            let listSize = 0;
            for (let i = 0; i < clockStore.cityListForHints.length; i++) {
                if (regex.test(clockStore.cityListForHints[i].city) && listSize <= 10) {
                    newResultList.push({
                        id: newID,
                        city: `${clockStore.cityListForHints[i].city}`,
                        region: `${clockStore.cityListForHints[i].region}`
                    });
                    newID++;
                    listSize++;
                }
            }
            setResultList(newResultList);
        }
    }

    function focusInput() {
        hintsList.current.classList.add('hintsList');
        setSelectState(true)

    }


    function apiRequestDate() {
        hintsList.current.classList.remove('hintsList');
        refInput.current.blur();
        dispatch(dataRetrievalOnRequest(enteredText))
        setSelectState(false)

    }
    function up(){
        createHintsList("");
    }

    useEffect(() => {
        console.log(resultsList)
        if (enteredText.length <= 0) {
            createHintsList("");
            setSelectState(true);
        }

            return () => {
                
            };

        }, [enteredText, clockStore.apiStatus]);
    return (

        <div className="search"  ref={domNode}>
            <div className="input__wrap">
            <input type="text" ref={refInput}  onFocus={focusInput} className="search__input"
                   placeholder="Search by city name" onKeyDown={selectionHints} value={enteredText}
                   onChange={updateInput}/>
            <button  className="search__bttn" onClick={apiRequestDate}>
                Search
            </button>
            </div>
            <ul className="search__result" ref={hintsList}>
                {resultsList.map((Item: any, index: number) => (<li
                    ref={(elRef: HTMLLIElement) => {resultListArray.current[index] = elRef;}}
                    onClick={() =>{
                        setSelectState(true)
                        changeInputData(Item.id, false)
                    }}
                    key={Item.id}>
                    {Item.city}
                </li>))}
            </ul>
            <button onClick={up}>dddd</button>
        </div>
    );
};

export default SearchPanel;
