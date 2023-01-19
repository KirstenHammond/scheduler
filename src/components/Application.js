//Main container for appointments and days

import React from "react";

//Custom hook
import useApplicationData from "hooks/useApplicationData";

//Components
import DayList from "./DayList";
import Appointment from "./Appointment";

//Helpers
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

//Styling
import "../styles/Application.scss";

export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const interviewersForDay = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const listOfApts = dailyAppointments.map((apt) => {
    return (
      <Appointment
        key={apt.id}
        {...apt}
        interview={getInterview(state, apt.interview)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        interviewersForDay={interviewersForDay}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {listOfApts}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
