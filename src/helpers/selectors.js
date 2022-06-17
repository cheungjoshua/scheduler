export function getAppointmentsForDay(state, day) {
  // if the state.days array is empty, return []
  if (state.days.length === 0) {
    return [];
  }
  // Get match day and make it a array
  const daysArray = state.days.filter((ii) => ii.name === day);
  // Check, if get nothing. return []
  if (daysArray.length === 0) {
    return [];
  }
  const appointmentArray = daysArray[0].appointments.map((id) => {
    if (state.appointments[id].id === id) {
      return state.appointments[id];
    }
  });

  return appointmentArray;
}
