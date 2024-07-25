import { combineReducers, legacy_createStore } from "redux";
import { todolistsReducer } from "../model/todolists-reducer";
import { tasksReducer } from "../model/tasks-reducer";

const reducer = combineReducers({ todolistsReducer, tasksReducer });

export type AppRootStoreType = {
  todolists: ReturnType<typeof todolistsReducer>;
  tasks: ReturnType<typeof tasksReducer>;
};

export const store: AppRootStoreType = legacy_createStore(reducer);
