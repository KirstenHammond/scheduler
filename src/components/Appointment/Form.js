//Create a new appointment by entering student name, selecting interviewer and clicking save, or cancel.
import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import PropTypes from "prop-types";

//Custom hook
import useValidation from "hooks/useValidation";

export default function Form(props) {

  const {interviewers} = props;

  const { error, student, setStudent, interviewer, setInterviewer, validate, cancel} = useValidation(props);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>

        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

Form.propTypes = {
  interviewers : PropTypes.arrayOf(PropTypes.object),
  interviewer: PropTypes.number,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  student: PropTypes.string
}