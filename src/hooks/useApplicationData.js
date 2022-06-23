import React, { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Api call once when render
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
  // child component provide
  const setDay = (day) => setState({ ...state, day });

  // Create the appointment
  const bookInterview = (id, interview) => {
    // Copy old appointment with provided ID and update the interview obj
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // Add the updated appointment to appointments obj
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Deep clone the days object for update spots
    let daysCopy = [...state.days].map((ii) => ({ ...ii }));
    let theDay = daysCopy.find((day) => {
      return day.appointments.includes(id);
    });

    // Use axios do API call to create interview appointment,
    // and setState the new obj created above
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      theDay.spots -= 1;
      setState({ ...state, appointments, days: daysCopy });
    });
  };

  // Delete the appointment
  const cancelInterview = (id) => {
    // Update the old individual appointment with interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    // Copy and update the old appointments obj with appointment above
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Deep clone the days object for update spots
    let daysCopy = [...state.days].map((ii) => ({ ...ii }));
    let theDay = daysCopy.find((day) => {
      return day.appointments.includes(id);
    });

    // Use axios do API call to delete interview appointment,
    // and setState the new obj created above
    return axios.delete(`/api/appointments/${id}`).then(() => {
      theDay.spots += 1;
      setState({ ...state, appointments, days: daysCopy });
    });
  };

  // Export above functions in one obj
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
