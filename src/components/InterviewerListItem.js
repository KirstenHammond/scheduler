//Each individual interviewer 

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "../styles/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const {selected, id, setInterviewer, avatar, name} = props;

  const interviewClassName = classnames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li
      className={interviewClassName}
      key={id}
      onClick={setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}

InterviewerListItem.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  setInterviewer: PropTypes.func,
  id: PropTypes.number,
  selected: PropTypes.bool
}