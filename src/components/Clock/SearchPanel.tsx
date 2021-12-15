
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {dataRetrievalOnRequest} from "../../store/setClockData";
const SearchPanel = () => {
    const dispatch = useAppDispatch();
    const clockStore = useAppSelector((state) => state.clock);
    const resultListArray = useRef<Array<HTMLElement>>([]);
    const currentRow = useRef<number>(-1);
    const searchData = useRef<any>({enteredText: ''});
    const [enteredText, setEnteredText] = useState('');
    const hintsList = useRef<any>(null);
    const [selectState, setSelectState] = useState(true);
    const [resultsList, setResultList] = useState<Array<hintsListObj>>([
        {id: 0, text: 'Kyiv'},
        {id: 1, text: 'Minsk'},
        {id: 2, text: 'Tokyo'},
        {id: 3, text: 'Moscow'},
    ]);
    const refInput = useRef<any>();
    const domNode = useRef<any>();
    interface KeyboardEvent {
        keyCode: number;
    }

    interface hintsListObj{
        id: number,
        text: string
    }

    // function hintsListDefault(){
    //     let arr: Array<hintsListObj> = [];
    //     for(let i = 0; i > 10; i++){
    //         arr.push({id: i, text: clockStore.cityListForHints[i].cityName})
    //     }
    //     setResultList(arr);
    // }

    function updateInput(event: ChangeEvent<HTMLInputElement> ) {
        let temporally = event.target.value;
        searchData.current.enteredText = temporally;
        createHintsList(temporally);
        setEnteredText(temporally);
        currentRow.current = -1;
        setSelectState(true)
    }

    function changeInputData(index: number, last: boolean) {
        if (selectState) {
            currentRow.current = index;
            if (last === true && index === -1) {
                setEnteredText(searchData.current.enteredText);
            } else if (last === true && index === resultsList.length) {
                setEnteredText(searchData.current.enteredText);
            } else {
                let offerResult = resultsList[index].text;
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
                    changeInputData(currentRow.current, false);
                    if (resultListArray.current[currentRow.current + 1]) {
                        resultListArray.current[currentRow.current + 1].classList.remove('active__list');
                    }
                }
            }
        }
    }

    function createHintsList(text: string) {
        let regex = new RegExp(`^${text}`, 'im');
        let newID = 0;
        let newResultList = [];
        let listSize = 0;
        for (let i = 0; i < clockStore.cityListForHints.length; i++) {
            if (regex.test(clockStore.cityListForHints[i].cityName)  && listSize <= 10) {
                newResultList.push({id: newID, text: `${clockStore.cityListForHints[i].cityName}`});
                newID++;
                listSize++;
            }
        }
        if (newResultList.length === 0) {
            // hintsList.current.classList.remove('hintsList');
            newResultList.push({id: newID, text: 'No search results'});
            setSelectState(false);
        } else {
            setSelectState(true);
        }

        setResultList(newResultList);
    }

    function focusInput() {
        hintsList.current.classList.add('hintsList');
        setSelectState(true)

    }

    function hideHintsResult(event: any) {
        if (!domNode.current.contains(event.target)) {
            hintsList.current.classList.remove('hintsList');
            refInput.current.blur();
        }
        setSelectState(false)
    }

    function apiRequestDate() {
        hintsList.current.classList.remove('hintsList');
        refInput.current.blur();
        dispatch(dataRetrievalOnRequest(enteredText))
        setSelectState(false)

    }

    useEffect(
        () => {
            // if(resultsList.length === 0 ){
            //     hintsListDefault();
            // }
            document.addEventListener('mousedown', hideHintsResult);
            return () => {
                document.removeEventListener('mousedown', hideHintsResult);
            };

        }, [enteredText]);
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
                    onClick={() => changeInputData(Item.id, false)}
                    key={Item.id}>
                    {Item.text}
                </li>))}
            </ul>
        </div>
    );
};

export default SearchPanel;
