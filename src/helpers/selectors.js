export function getAppointmentsForDay(state, day) {
  // if the state.days array is empty, return []
  if (state.days.length === 0) {
    return [];
  }
  // Get match day and make it a array
  const dayObj = state.days.find((ii) => ii.name === day);
  // Check, if get nothing. return []
  if (!dayObj) {
    return [];
  }
  const appointmentArray = dayObj.appointments.map((id) => {
    return state.appointments[id];
  });

  return appointmentArray;
}
