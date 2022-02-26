import React, { createContext, useReducer } from "react";
import "./styles/App.css";
import RouteConfig from "./Router";

import { reducer, initialState } from "./reducers/userReducer";
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <RouteConfig UserContext={UserContext} />
    </UserContext.Provider>
  );
};

export default App;
