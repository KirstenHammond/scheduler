//Full list of available interviewers render based on the day

import React from "react";
import PropTypes from "prop-types";

import InterviewerListItem from "./InterviewerListItem";
import "../styles/InterviewerList.scss";

export default function InterviewerList(props) {

  const {interviewers, value, onChange} = props;

  const fullListofInterviewers = interviewers.map((int) => (
    <InterviewerListItem
      key={int.id}
      name={int.name}
      id={int.id}
      avatar={int.avatar}
      selected={int.id === value}
      setInterviewer={() => onChange(int.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{fullListofInterviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired, //isRequired adds warning in console stating what the expected type should be
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
