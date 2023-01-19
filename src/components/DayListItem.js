import React from "react";
import classnames from "classnames";
import 'components/DayListItem.scss'

//Helpers
import formatSpots from "helpers/formatSpots";

export default function DayListItem(props) {

  const {selected, spots, name, setDay} = props;

  //Change the css class depending on which day is selected
  const dayClass = classnames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0

  });

  return (
    <li 
    className={dayClass} 
    onClick={() => setDay(name)} 
    selected={selected}
    data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light"> {formatSpots(spots)} </h3>
    </li>
  );
}