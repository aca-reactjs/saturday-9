import { useEffect, useReducer } from "react";

const requestStatus = {
  initial: "initial",
  loading: "loading",
  fulfilled: "fulfilled",
  error: "error",
};

const initialState = {
  status: requestStatus.initial,
  data: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case requestStatus.initial:
      return initialState;
    case requestStatus.loading:
      return { ...state, status: requestStatus.loading };
    case requestStatus.fulfilled:
      return {
        ...state,
        status: requestStatus.fulfilled,
        data: action.payload.data,
      };
    default:
      return {
        ...state,
        status: requestStatus.error,
        error: action.payload.error,
      };
  }
}

function App() {
  const [{ status, error, data }, dispatch] = useReducer(
    reducer,
    initialState,
    (state) => {
      return {
        ...state,
        status: requestStatus.loading,
      };
    }
  );

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/name/aruba?fullText=true")
      .then(async (res) => {
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.message);
        }

        return json;
      })
      .then((prop) => {
        dispatch({ type: requestStatus.fulfilled, payload: { data: prop } });
      })
      .catch((err) => {
        dispatch({
          type: requestStatus.error,
          payload: { error: { message: err.message } },
        });
      });
  }, []);

  return (
    <div className="App">
      {status === requestStatus.loading ? (
        <div>...loading</div>
      ) : status === requestStatus.fulfilled && data?.length ? (
        data.map((country) => {
          return (
            <div key={country.name} className="filmContainer">
              <div>{`Country Name: ${country.name.common}`}</div>
            </div>
          );
        })
      ) : status === requestStatus.error && error?.message ? (
        <div>{error.message}</div>
      ) : null}
    </div>
  );
}

export default App;
