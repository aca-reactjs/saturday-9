import { useState, createRef, useRef, useEffect, useMemo } from "react";

let outerRef = null;

function App() {
  const inputRef = useRef(null);
  const anotherRef = useRef(null);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      console.log("inputRef.current", inputRef.current);
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    console.log(`🐞 / App / anotherRef`, anotherRef);
  }, [state]);

  return (
    <div className="App">
      <input
        ref={inputRef}
        type="text"
        onFocus={() => {
          console.log("I am focused");
          setState(!state);

          anotherRef.current = !anotherRef.current ? 1 : anotherRef.current + 1;
        }}
      />
      <button>click</button>
    </div>
  );
}

export default App;
