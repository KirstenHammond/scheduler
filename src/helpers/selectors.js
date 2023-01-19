/** getAppointmentsForDay
 * To filter the days array of objects based on the day provided and extract the array of appointment objects
 * @param {*} state from api/days res.data
 * @param {*} day  Monday
 * Expected output [{}, {}, {}]
 */

export function getAppointmentsForDay(state, day) {
  const findDay = state.days.find((d) => d.name === day);
  if (!findDay) {
    return [];
  }
  return findDay.appointments.map((id) => state.appointments[id]);
}





/** getInterview
 * Takes in the state object and interview object to render details about each interview
 * @param {*} state the state object comprising days, appointments, interviewers
 * @param {*} interview an object (state.appointments[aptID].interview)
 * @returns null if interview is null. Else, returns the object {student:JaneDoe, interview:{id:1, name:, sylvia palmer, avatar: "url"}}
 */
export function getInterview(state, interview) {
  if (interview === null) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}



/** getInterviewersForDay
 * To filter the days array of objects based on the day provided and extract the array of interviwer objects
 * @param {*} state from api/days res.data
 * @param {*} day Monday
 * Expected output eg [{}, {}, {}]
 */

export function getInterviewersForDay(state, day) {
  const findDay = state.days.find((d) => d.name === day);
  if (!findDay) {
    return [];
  }
  
  return findDay.interviewers.map((id) => state.interviewers[id]);
}
