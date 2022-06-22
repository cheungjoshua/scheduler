import React, { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Api call one time
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

  // Copy everything from state, and set the day with the day that
  //  child component provide
  const setDay = (day) => setState({ ...state, day });

  //Create the appointment
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    let daysCopy = [...state.days].map((ii) => ({ ...ii }));
    let theDay = daysCopy.find((day) => {
      return day.appointments.includes(id);
    });

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      theDay.spots -= 1;
      setState({ ...state, appointments, days: daysCopy });
    });
  };

  //Delete the appointment
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    let daysCopy = [...state.days].map((ii) => ({ ...ii }));
    let theDay = daysCopy.find((day) => {
      return day.appointments.includes(id);
    });

    return axios.delete(`/api/appointments/${id}`).then(() => {
      theDay.spots += 1;
      setState({ ...state, appointments, days: daysCopy });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
