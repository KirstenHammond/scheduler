import React, { useState } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};


export default function Application(props) {
  const [day, setDay] = useState('Monday');


  const listOfApts = Object.values(appointments).map((apt) =>
    <Appointment
      key={apt.id}
      {...apt}
    />)


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
            days={days}
            value={day}
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
*/