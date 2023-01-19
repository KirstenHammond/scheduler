//Main container that displays various modes depending on pathway

import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import PropTypes from "prop-types";

//Custom hook
import useVisualMode from "hooks/useVisualMode";

import "../../styles/appointmentStyles.scss";

//Mode constants
const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { interview, bookInterview, id, cancelInterview, interviewersForDay, time } = props;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  //Saving logic
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((e) => transition(ERROR_SAVE, true));
  }

  //Deleting logic
  function deleteApt() {
    transition(DELETING, true);

    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((e) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          interview={interview}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
          id={id}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewersForDay}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={deleteApt}
          onCancel={back}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && (
        <Form
          interviewer={interview.interviewer.id}
          student={interview.student}
          interviewers={interviewersForDay}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment" onClose={back} />
      )}
    </article>
  );
}

//const { interview, bookInterview, id, cancelInterview, interviewersForDay, time } = props;

Appointment.propTypes = {
interview:PropTypes.object, 
bookInterview: PropTypes.func, 
id: PropTypes.number, 
cancelInterview: PropTypes.func, 
interviewersForDay: PropTypes.array, 
time: PropTypes.string
};