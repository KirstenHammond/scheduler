import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || ""); //If the data already exists, use it as the default. Otherwise, use ""/null
  const [interviewer, setInterviewer] = useState(props.interviewer || null);



  const reset = function () {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = function () {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={e => setStudent(e.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}

        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger >Cancel</Button>
          <Button onClick={() => props.onSave(student, interviewer)} confirm >Save</Button>
        </section>
      </section>
    </main>
  );
}