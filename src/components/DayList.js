//Container for Mon - Fri list of days
import React from "react";
import DayListItem from "./DayListItem";
import PropTypes from "prop-types";

export default function DayList(props) {

  const {days, value, onChange} = props;

  const indivDayListItem = days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === value}
      setDay={onChange}
    />
  ));

  return <ul>{indivDayListItem}</ul>;
}

DayList.propTypes = {
  days: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
  onChange: PropTypes.func
}