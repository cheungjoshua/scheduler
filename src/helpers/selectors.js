export function getAppointmentsForDay(state, day) {
  // if the state.days array is empty, return []
  if (state.days.length === 0) {
    return [];
  }

  // Get match day and make it a obj
  const dayObj = state.days.find((ii) => ii.name === day);

  // Check, if get nothing. return []
  if (!dayObj) {
    return [];
  }

  // Find the appointment and make it a array
  const appointmentArray = dayObj.appointments.map((id) => {
    return state.appointments[id];
  });

  return appointmentArray;
}

export function getInterview(state, interview) {
  // Return null if interview is empty
  if (!interview) {
    return null;
  }

  // Get ID from interview
  const interviewerId = interview.interviewer;

  // Get student from interview
  const student = interview.student;

  // Set Obj
  const result = { student, interviewer: state.interviewers[interviewerId] };

  // Return Obj
  return result;
}

// Copy from getAppointmentsForDay function
export function getInterviewersForDay(state, day) {
  // if the state.days array is empty, return []
  if (state.days.length === 0) {
    return [];
  }

  // Get match day and make it a obj
  const dayObj = state.days.find((ii) => ii.name === day);

  // Check, if get nothing. return []
  if (!dayObj) {
    return [];
  }

  // Find the appointment and make it a array
  const interViewersArray = dayObj.interviewers.map((id) => {
    return state.interviewers[id];
  });

  return interViewersArray;
}
