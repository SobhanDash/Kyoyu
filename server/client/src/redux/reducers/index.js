import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import messageReducer from "./messageReducer";

const reducers = combineReducers({
  userReducer: userReducer,
  postReducer: postReducer,
  messageReducer: messageReducer,
});

export default reducers;
