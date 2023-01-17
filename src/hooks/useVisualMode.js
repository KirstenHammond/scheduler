import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace = false) {
    //console.log('mode', mode);
    setMode(newMode);

    if (!replace) {
      setHistory(prev => [...prev, newMode]);
    }
    else {
      const historyCopy = [...history];
      historyCopy.pop();
      setHistory([...historyCopy, newMode]);
    }
  }

  //console.log('mode in between', mode);
  //console.log('history in between', history);

  function back() {
    if (history.length > 1) {
      const historyCopy = [...history];
      historyCopy.pop();
      setMode(historyCopy[historyCopy.length - 1]);
      setHistory(historyCopy);
    }
  };

  return {
    mode,
    transition,
    back
  }
};