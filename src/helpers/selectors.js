/**
 * To filter the days array of objects based on the day provided and extract the array of appointment objects
 * @param {*} state eg from api/days res.data 
 * @param {*} day eg Monday
 * Expected output eg [{}, {}, {}]
 */

export function getAppointmentsForDay(state, day) {
  const allAptArr = [];

  if (state.days.length === 0) { return allAptArr };

  const filtResult = state.days.filter(filtDay => {
    if (filtDay.name !== day) {
      return false;
    } return true;
  })
  if(filtResult.length === 0) {return allAptArr};
  
  const dayAptArr = filtResult[0].appointments;

  Object.values(state.appointments).filter(apt => {
    for (let aptDay of dayAptArr) {
      if (aptDay === apt.id) {
        allAptArr.push(apt);
      }
    }
  });

  return allAptArr;

};

/**
 * Takes in the state object and interview object to render details about each interview
 * @param {*} state the state object comprising days, appointments, interviewers
 * @param {*} interview an object (state.appointments[aptID].interview)
 * @returns null if interview is null. Else, returns the object {student:JaneDoe, interview:{id:1, name:, sylvia palmer, avatar: "url"}}
 */
export function getInterview(state, interview){
  if (interview === null) return null;

  return {
    student : interview.student,
    interviewer : state.interviewers[interview.interviewer]
  }
  
};


/**
 * To filter the days array of objects based on the day provided and extract the array of interviwer objects
 * @param {*} state eg from api/days res.data 
 * @param {*} day eg Monday
 * Expected output eg [{}, {}, {}]
 */

export function getInterviewersForDay(state, day) {
  const allIntArr = [];

  if (state.days.length === 0) { return allIntArr };

  const filtResult = state.days.filter(filtDay => {
    if (filtDay.name !== day) {
      return false;
    } return true;
  })
  if(filtResult.length === 0) {return allIntArr};
  
  const dayIntArr = filtResult[0].interviewers;

  Object.values(state.interviewers).filter(int => {
    for (let intDay of dayIntArr) {
      if (intDay === int.id) {
        allIntArr.push(int);
      }
    }
  });

  return allIntArr;

};