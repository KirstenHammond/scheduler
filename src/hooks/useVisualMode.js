import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  //TBC NEED MENTOR CALL
  function transition(mode, replace = false) {
    //console.log('mode', mode);
    setMode(mode);

    if (!replace) {
      history.push(mode);
    }
    else {
      setHistory([initial, mode]);
    }
  }

  //console.log('mode in between', mode);
  //console.log('history in between', history);

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1])
    }
  };

  return {
    mode,
    transition,
    back
  }
};