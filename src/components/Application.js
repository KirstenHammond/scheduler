import React, { useState, useEffect } from "react";
import axios from "axios";

//components
import DayList from "./DayList";
import Appointment from "./Appointment";

//helpers
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

//styling
import "components/Application.scss";


export default function Application(props) {

  //using state object to manage multiple states held within
  const [state, setState] = useState({
    day: "Monday", //default start day
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // console.log(all[0]); // first
      // console.log(all[1]); // second
      // console.log(all[2]); // third
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])


  //apts/int logic
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const listOfApts = dailyAppointments.map((apt) => {
    const interview = getInterview(state, apt.interview);
    return (
      <Appointment
        key={apt.id}
        {...apt}
        interview={interview}
      />
    )
  });


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
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {listOfApts}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


/* To make a state not stale
setCounter((prev) => prev +1 );

const [text, setText] =useState(0);
const [data, setData] =useState(["friend 1", "friend 2"]);

const addArrayItem= function(){
//Old way
//const newData = data.slice(); //copies data array. have to pass a NEW array as react will only do a shallow comparison to check if state has changed in order to rerender page.

//using spread. also creates a copy of the data array
const newData = [...data];
newData.push(text);
//or
const newData = [...data, text] //aka an immutable push to the end of the list
//const newData = [text, ...data] //aka an immutable push to the beginning of the list
//or
setData([...data, text]);
}

//object
const alice = {
  name: 'alice',
  age: 29, 
  favorites: ['ice cream', 'coke']
}

const bob = {...alice, name:'bob', dogsName: 'bruno'}; //changes the name and adds dogsName:bruno. original object unaffected.
const bob.favorites = [...alice.favorites, "Hot dogs"] // double immutability! the original array in alice is still a shallow reference
//or
const dogsName = 'bruno'
const bob = {...alice, name:'bob', dogsName}; //changes the name and adds dogsName variable. original object unaffected. care when adding order as any existing key will be replaced

const removeItem= function(remove) {
  const newData = data.filter(item => { //using filter to remove items from an array. use id if items arent unique
    return item != remove;
  })

  setData(newData);
}

const list = data.map((item, i)=>{
  return <li key={i} onClick={() => removeItem(item)}>{item}</li>});

return(
  <div>
<input type="text" value={text} onClick={(e) => setText(e.tagert.value)}{/>
  <button type="button" onClick={addItem}>Add friend</button> 
</div>
<ul>
{list}
</ul>
)

//Nally lecture
use effect to clean up components after rendering?
what is the extent to the things you can change with useEffect? eg doc title. 
how would you decide where to put useEffect with multiple children/parent components?

const [count, setCount] = useState(0)
useEffect(()=>{
document.title= `count= ${count}
console.log("document titel changed") //this returns undefined, which is allowed according to the rules of useeeffect hook
 return ()=> {
  //multiline function that gets returned OPTIONAL
 }
}, [count]) //optional, with NO array, the function will still run on every render . with and EMPTY array, it will only run once after rendering.dependency array eg manage these side effects only when this is changed


useEffect(()=>{
const intervalReference = setTimeout(etc)
 return ()=> {
  clearInterval(intervalReference)
 }
}, []) //optional, with NO array, the function will still run on every render . with and EMPTY array, it will only run once after rendering.dependency array eg manage these side effects only when this is changed

when pulling data to set state

const [ingredient, setIngredient] = useState([]) // matches the shape of the data by using an empty array
const [loading, setLoading] = useState(true)
npm i axios
import axios from 'axios'

useEffect(()=>{
  console.log('fetching data using axios')
 const ingredientsPromise = axios.get('route to data/url');
 ingredientsPromise.then((response)=>{
  console.log('response success', response.data)
  setIngredient(response.data);
  setLoading(false);
}).catch((e)=>{ console.log('error in catch', e)})
}, []) //empty array will just run it once

with ingredients.map() it will now

{loading && <p>Loading...</p>}

//Breakout

with mutiple props
const {name, id, onSave} = props


//Custom hooks Andy
If a helper function tracks state, use custom hooks. Always a .js file.
If not, its just a helper function.

in hooks/useDocumentTitle.js
const useDocumentTitle = (title) => {
  useEffect(()=>{
    document.title = title
  }, [title]) // track changes to title and render when it changes
}

then in app.js
useDocumentTitle(title);

Mouseover
const Mousemove = () => {
  const [coords, setCoords] =useState({x:0, y:0})

useEffect(()=> {
  const mouseMoveListener = (event)=> {
  console.log(event.clientX, event.clientY)
  setCoords({x:event.clientX, y:event.ClientY});

document.addEventListener('mousemove', mouseMoveListener)

  const cleanUp = () => {
    document.removeEventListener('mousemove', mouseMoveListener)
  }
return cleanup;

}, [])

return (
  <div>{coords.x coords.y}</>
  )
})

const useInput = (initalValue) => {

const [value, setValue] = useState(initialValue)

const onChange = (event) => setValue(event.target.value);

const clear = () => setValue('')

return {
  value, 
  onChange,
  onBlur : clear
}
}

in app.js
const Component (props) => {

const userNameInput = useInput('');

return ( 
<input
value= {usernameInput.value}
onChange={usernameInput.onChange}
onBlur={usernameInput.onBlur}
>
OR
<input
{...usernameInput}
>

awesome-react-hooks
my-json-server-typicode

setHistory(prev => ([...prev, 'CREATE']))

useVisualMode tracks the state of each appointment in a history array in appointment item. so that back button can be used to be back track to a previous state

useApplicationData will contain all the app data logic eg const state=useApplicationData() in app 
*/