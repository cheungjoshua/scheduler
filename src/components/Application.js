import React from "react";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment/";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  // Use helper function get daily appointments
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // Use helper function get array of interviewers of the day
  const interviewers = getInterviewersForDay(state, state.day);

  // Map the daily appointments to single component
  const appointmentArray = dailyAppointments.map((appointment) => {
    // Use helper function get the interview of the day
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
      <section className="schedule">{appointmentArray}</section>
    </main>
  );
}
