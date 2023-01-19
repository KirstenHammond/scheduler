import { useState } from "react";

/** useVisualMode
 * Imported into Appointment/index.js
 * @param {*} initial initial mode to render from
 * @returns an object {mode, transition, back}
 */
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);

    if (!replace) {
      setHistory((prev) => [...prev, newMode]);
    } else {
      const historyCopy = [...history];
      historyCopy.pop();
      setHistory([...historyCopy, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      const historyCopy = [...history];
      historyCopy.pop();
      setMode(historyCopy[historyCopy.length - 1]);
      setHistory(historyCopy);
    }
  }

  return {
    mode,
    transition,
    back,
  };
}
