import {useState, useEffect} from 'react';
import axios from "axios";

export default function useApplicationData(){
   
  //using state object to manage multiple states held within
  const [state, setState] = useState({
    day: "Monday", //default start day
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

//Fetches data from API
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

function countFreeSpots(state){
  const currentDay = state.days.find(day => day.name === state.day);
  return currentDay;
}
console.log('freespots', countFreeSpots(state));

  //Add interview object to appointment object @ id
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    
    return axios.put(`/api/appointments/${id}`, appointment)//
      .then(() => {
        setState({
          ...state,
          appointments
        });
        console.log("appointment saved");
      })
  }

  //Delete interview object
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments
        });
        console.log("appointment deleted");
      })
  }

  return {
    state, 
    setDay, 
    bookInterview,
    cancelInterview
  }
}