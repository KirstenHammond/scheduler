import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error"
import useVisualMode from "hooks/useVisualMode";

import 'components/Appointment/styles.scss'

//mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {

  console.log('appointment props', props);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        console.log("save success");
        transition(SHOW);
      })
      .catch(e => {
        transition(ERROR_SAVE, true);
        console.log("error save", e);
      });
  }

  //Deleting
  function clickTrash() { transition(CONFIRM) };

  function deleteApt() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(e => {
        transition(ERROR_DELETE, true);
        console.log("error delete", e);
      });
    }

  //Editing
  function onEdit() { transition(EDIT) };


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          interview={props.interview}
          onEdit={onEdit}
          onDelete={clickTrash}
          id={props.id}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewersForDay} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message='Saving' />}
      {mode === CONFIRM && <Confirm message='Are you sure you want to delete?' onConfirm={deleteApt} onCancel={back} />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === EDIT && <Form interviewer={props.interview.interviewer.id} student={props.interview.student} interviewers={props.interviewersForDay} onCancel={back} onSave={save} />}
      {mode === ERROR_SAVE && <Error message="Error saving" onClose={back}/>}
      {mode === ERROR_DELETE && <Error message="Error deleting" onClose={back}/>}
    </article>
  );
}