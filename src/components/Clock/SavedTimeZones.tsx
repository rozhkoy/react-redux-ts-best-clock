import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {changeTimezoneFromSaved, removeFromInList } from "../../store/setClockData";

const SavedTimeZones = () => {
    const savedTimezone = useAppSelector((state) => state.Clock.addedTimezoneInList);
    const dispatch = useAppDispatch();
    return (
        <ul className="preview-time">
            {
                savedTimezone.map((item) => (
                    <li key={item.id} className="preview-time__item">
                        <div className="first-level">
                            <button className="first-level__remove-city" onClick={() => dispatch(removeFromInList(item.id))}>&#x2715;</button>
                        </div>
                        <div className="second-level" onClick={() => dispatch(changeTimezoneFromSaved({id: item.id, timezone: item.city, region: item.region, diff: item.difference}))}>{item.city}</div>
                        <div className="third-level">{item.timeIn}</div>
                    </li>)
                )
            }
        </ul>
    )

}


export default SavedTimeZones;

