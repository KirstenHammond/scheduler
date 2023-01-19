import { useState } from "react";
 
/** useValidation
 * Removing the validation and state logic from Form.js and managing in this custom hook
 * @param {*} props from Form.js 
 * @returns An Object {
    error, 
    student,
    setStudent, 
    interviewer,
    setInterviewer,
    validate,
    cancel
  }
 */
export default function useValidation(props) {

  const [student, setStudent] = useState(props.student || ""); //If the data already exists, use it as the default. Otherwise, use ""/null
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }
  
  const reset = function () {
    setStudent("");
    setInterviewer(null);
  };
  
  const cancel = function () {
    reset();
    props.onCancel();
  };

  return {
    error, 
    student,
    setStudent, 
    interviewer,
    setInterviewer,
    validate,
    cancel
  };
}