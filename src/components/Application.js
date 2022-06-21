import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment/";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((res) => {
      const days = res[0].data;
      const appointments = res[1].data;
      const interviewers = res[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  //Create the appointment
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    console.log(appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log(appointments);
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments });
    });
  };

  //Delete the appointment
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    console.log(appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments });
    });
  };

  // Use helper function get daily appointments
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // Map the daily appointments to single component
  const appointmentArray = dailyAppointments.map((appointment) => {
    // Use helper function get the interview of the day
    const interview = getInterview(state, appointment.interview);

    // Use helper function get array of interviewers of the day
    const interviewers = getInterviewersForDay(state, state.day);

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

  const setDay = (day) => setState({ ...state, day });

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
