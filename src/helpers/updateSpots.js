
/**
 * Used in useApplicationData to update spots when bookInterview or cancelInterview is called
 * @param {*} state current state
 * @param {*} appointments created in bookInterview and cancelInterview
 * @returns an update day object which is used to update state 
 */
export default function updateSpots(state, appointments) {
  const newDays = [...state.days]

  const dayObj = newDays.find(d => d.name === state.day);

  let spots = 0;
  for (const id of dayObj.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) {
      spots++;
    }
  }

  const day = {...dayObj, spots};
 
  return state.days.map(d => d.name === state.day ? day : d)
  
}