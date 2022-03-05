import { useReducer } from "react";

const initialState = { count: 0 };

const dispatchMap = {
  increment: "increment",
  decrement: "decrement",
  reset: "reset",
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    case "add12":
      return { count: state.count + action.payload.quantity };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
      <button
        onClick={() => dispatch({ type: "add12", payload: { quantity: 12 } })}
      >
        add 12
      </button>
      <button
        onClick={() => {
          try {
            if (dispatchMap["1234"]) {
              dispatch({ type: "1234", payload: { quantity: 12 } });
            } else {
              throw new Error("unhandled dispatch");
            }
          } catch (err) {
            console.log(err.message);
          }
        }}
      >
        add 1234
      </button>
    </>
  );
}

export default Counter;
