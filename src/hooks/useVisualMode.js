import { useState } from "react";

// Function for rendering Appointment Component

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory(replace === false ? [...history, mode] : [...history]);
  }

  function back() {
    const copy = [...history];
    setHistory(copy.slice(0, -1));
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
};

export default useVisualMode;
