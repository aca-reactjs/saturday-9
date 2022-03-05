import { useState, createRef, useRef, useEffect, useMemo } from "react";
import Screen from "./components/Screen";

const listStyles = {
  listStyle: "none",
  display: "flex",
  width: 200,
  height: 200,
  zIndex: 1000,
};

const listItemStyles = {
  width: 200,
  minWidth: 200,
  border: "1px solid red",
  aspectRatio: "1/1",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const buttonStyles = {
  background: "white",
  padding: "5px",
  border: "none",
  outline: "none",
  boxShadow: "0 0 0 1px black",
};

const items = ["one", "two", "three"];

const ButtonClickType = {
  next: "next",
  prev: "prev",
};

useRef = (initialValue) => ({ current: initialValue });

function App() {
  const [activeItemPosition, setActiveItemPosition] = useState(0);
  const [disabledButton, setDisabledButton] = useState(null);

  const handleButtonClick = (type) => () => {
    if (type === ButtonClickType.next) {
      if (activeItemPosition <= 1) {
        setActiveItemPosition((prev) => prev + 1);
      } else {
        setDisabledButton(ButtonClickType.next);
      }

      return;
    }

    if (activeItemPosition >= 1) {
      setActiveItemPosition((prev) => prev - 1);
    } else {
      setDisabledButton(ButtonClickType.prev);
    }
  };

  const translateLength = activeItemPosition * 200;

  return (
    <div>
      <Screen
        style={{
          width: 200,
          height: 200,
          overflow: "hidden",
          borderRadius: "5px",
          zIndex: 0,
        }}
      >
        <ul
          style={{
            ...listStyles,
            transform: `translateX(-${translateLength}px)`,
            transition: "all 1000ms linear",
          }}
        >
          {items.map((el) => (
            <li style={listItemStyles} key={el}>
              <span>{el}</span>
            </li>
          ))}
        </ul>
      </Screen>
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
          <button
            onClick={handleButtonClick(ButtonClickType.prev)}
            disabled={disabledButton === ButtonClickType.prev}
            style={buttonStyles}
          >
            {"<"}
          </button>
          <button
            onClick={handleButtonClick(ButtonClickType.next)}
            style={buttonStyles}
            disabled={disabledButton === ButtonClickType.next}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
