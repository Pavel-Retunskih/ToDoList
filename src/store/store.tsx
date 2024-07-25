import { todolistsReducer } from "../model/todolists-reducer";
import { tasksReducer } from "../model/tasks-reducer";
import { legacy_createStore } from "redux";
import { combineReducers } from "redux";

export type AppRootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

export const store = legacy_createStore(rootReducer);

// @ts-ignore
window.store = store;
