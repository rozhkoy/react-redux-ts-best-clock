import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {useRef, useState} from "react";

import {findAllInRenderedTree} from "react-dom/test-utils";
import internal from "stream";

const SearchPanel = () => {



    const cityListForHits = useAppSelector((state) => state.clock)
    const dispatch = useAppDispatch();
    const resultListArray = useRef<Array<HTMLElement>>([]);
    const counterRow = useRef<number>(-1);
    const searchDate = useRef<any>({enteredText: ''});
    const [enteredText, setEnteredText] = useState('');
    const hitsList = useRef(null);
    const [selectState, setSelectState] = useState(true);
    const [resultsList, setResultList] = useState([
        {id: 0, text: 'Kyiv'},
        {id: 1, text: 'Minsk'},
        {id: 2, text: 'Tokyo'},
        {id: 3, text: 'Moscow'},
    ]);
    const refInput = useRef();
    const [hintsListUpdate, setHintsListUpdate] = useState();
    const domNode = useRef();



    // function updateHintsList() {
    //     resultListArray.current.length = 0;
    //     const hintsList:any = resultsList.map((Item: any, index: number) => (
    //         <li
    //             ref={(elRef) => {
    //                 resultListArray.current[index] = elRef;
    //             }}
    //             onClick={() => changeInputDate(Item.id, false)}
    //             key={Item.id}
    //         >
    //             {Item.text}
    //         </li>
    //     ));
    //
    //     setHintsListUpdate(hintsList);
    // }

    function updateInput(event: React.SyntheticEvent) {
        let temporally = event.target.value;
        searchDate.current.enteredText = temporally;
        createHintsList(temporally);
        setEnteredText(temporally);
        counterRow.current = -1;
        setSelectState(true)
    }

    function changeInputDate(index, last) {
        if (selectState) {
            counterRow.current = index;
            if (last === true && index === -1) {
                setEnteredText(searchDate.current.enteredText);
            } else if (last === true && index === resultsList.length) {
                setEnteredText(searchDate.current.enteredText);
            } else {
                let offerResult = resultsList[index].text;
                setEnteredText(offerResult);
            }
            setSelectState(true);
        }
    }

    function selectionHints(event) {
        // enter
        if (event.keyCode === 13) {
            apiRequestDate();
        }
        //  to bottom
        if (selectState) {
            if (event.keyCode === 40) {
                resultListArray.current[resultsList.length - 1].classList.remove('active__list');
                counterRow.current++;
                if (counterRow.current >= resultsList.length) {
                    counterRow.current = -1;
                    changeInputDate(counterRow.current, true);
                }
                if (resultListArray.current[counterRow.current]) {
                    resultListArray.current[counterRow.current].classList.add('active__list');
                    changeInputDate(counterRow.current, false, resultsList[counterRow.current].latlng);
                    if (resultListArray.current[counterRow.current].previousSibling) {
                        resultListArray.current[counterRow.current].previousSibling.classList.remove('active__list');
                    }
                }
            }
            // to top
            if (event.keyCode === 38) {
                counterRow.current--;
                if (counterRow.current < -1) {
                    counterRow.current = resultsList.length - 1;
                    resultListArray.current[0].classList.remove('active__list');
                }
                if (counterRow.current === -1) {
                    changeInputDate(counterRow.current, true);
                    counterRow.current = resultsList.length;
                    resultListArray.current[0].classList.remove('active__list');
                }
                if (resultListArray.current[counterRow.current]) {
                    resultListArray.current[counterRow.current].classList.add('active__list');
                    changeInputDate(counterRow.current, false, resultsList[counterRow.current].latlng);
                    if (resultListArray.current[counterRow.current + 1]) {
                        resultListArray.current[counterRow.current + 1].classList.remove('active__list');
                    }
                }
            }
        }
    }

    function createHintsList(text) {
        let regex = new RegExp(`^${text}`, 'i', 'm');
        let newID = 0;
        let newResultList = [];
        let listSize = 0;
        for (let i = 0; i < listForHints.length; i++) {
            if (listForHints[i].capital.match(regex) && listSize <= 10) {
                newResultList.push({id: newID, text: `${listForHints[i].capital}`});
                newID++;
                listSize++;
            }
        }
        if (newResultList.length === 0) {
            hitsList.current.classList.remove('hintsList');
            newResultList.push({id: newID, text: 'No search results'});
            setSelectState(false);
        } else {
            setSelectState(true);
        }
        listSize = 0;
        setResultList(newResultList);
        updateHintsList();
    }

    function focusInput() {
        hitsList.current.classList.add('hintsList');
        setSelectState(true)

    }

    function hideHintsResult(event) {
        if (!domNode.current.contains(event.target)) {
            hitsList.current.classList.remove('hintsList');
            refInput.current.blur();
        }
        setSelectState(false)
    }

    function apiRequestDate() {
        hitsList.current.classList.remove('hintsList');
        refInput.current.blur();
        fetch(`https://api.ipgeolocation.io/timezone?apiKey=1951161faacc41268be75b771f166a97&location=${enteredText}`)
            .then((response) => response.json())
            .then((commints) => {
                console.log(commints)
                if ('ip' in commints.geo) {
                    showMessage('Oops, no such city found');
                } else {
                    props.FunCalcDifferenceTime(commints, enteredText);
                }
                setSelectState(false)
            });
    }

    useEffect(
        () => {
            document.addEventListener('mousedown', hideHintsResult);
            updateHintsList();
            return () => {
                document.removeEventListener('mousedown', hideHintsResult);
            };
        }, [enteredText]);
    return (
        <div className="search">
            <input type="text" ref={refInput} onFocus={focusInput} className="search__input"
                   placeholder="Search by city name" onKeyDown={selectionHints} value={enteredText}
                   onChange={updateInput}/>
            <button className="search__bttn" onClick={apiRequestDate}>
                Search
            </button>
            <ul className="search__result" ref={hitsList}>
                resultsList.map((Item: any, index: number) => (<li
                    ref={(elRef: HTMLLIElement) => {
                        resultListArray.current[index] = elRef;
                    }}
                    onClick={() => changeInputDate(Item.id, false)}
                    key={Item.id}
                >
                    {Item.text}
                </li>
            </ul>


            {/*<input type="text" className="search__input" placeholder="Search by city name"*/}
            {/*/>*/}
            {/*<button className="search__bttn">*/}
            {/*    Search*/}
            {/*</button>*/}
            {/*<ul className="search__result">*/}

            {/*</ul>*/}


        </div>
    );
};

export default SearchPanel;
