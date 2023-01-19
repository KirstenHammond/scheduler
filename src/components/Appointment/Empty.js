//Blank appointment slot with central Add button to create new appointment
import React from "react";
import PropTypes from "prop-types";

export default function Empty(props) {

  const { onAdd } = props;
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
}

Empty.propTypes = {
  onAdd : PropTypes.func
}