import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss';

export default function InterviewerList(props) {
  //incoming props = .interviewers (obj {name id avatar}) .onChange(fn) .interviewer (the id of selected interviewer)
  // const [value, onChange] = useState();
  const fullListofInterviewers = props.interviewers.map((int) =>
    <InterviewerListItem
      key={int.id}
      name={int.name}
      id={int.id}
      avatar={int.avatar}
      selected={int.id === value}
      setInterviewer={()=> onChange(int.id)}
    />)


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {fullListofInterviewers}
      </ul>
    </section>
  );
}