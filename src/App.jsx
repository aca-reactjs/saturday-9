import { useState, createRef, useRef, useEffect, useMemo } from "react";

let outerRef = null;

const listStyles = { listStyle: "none", display: "flex", gap: "1rem" };

const listItemStyles = {
  width: 200,
  maxWidth: 200,
  border: "1px solid red",
  aspectRatio: "1/1",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

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
    <div className="App" style={{ padding: "1rem" }}>
      <ul style={listStyles}>
        {["one", "two", "three"].map((el) => (
          <li style={listItemStyles} key={el}>
            <span>{el}</span>
          </li>
        ))}
      </ul>
      <div style={{ width: 200 }}>
        <div
          className="buttonWrapper"
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button>Prev</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
