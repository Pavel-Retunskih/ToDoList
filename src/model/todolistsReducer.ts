import { v1 } from "uuid";
import { FilterType } from "../ToDoList";
export type TodolistsType = {
  id: string;
  title: string;
};

export let todolistId1 = v1();
export let todolistId2 = v1();

export const initialState: TodolistsType[] = [
  { id: todolistId1, title: "What to learn" },
  { id: todolistId2, title: "What to buy" },
];

type ActionsTypes =
  | AddTodolistACType
  | RemoveTodolistACType
  | ChangeTodolistTitleACType
  | ChangeTodolistsFilterACType;

export const todolistsReducer = (
  state: TodolistsType[],
  action: ActionsTypes
): TodolistsType[] => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      const newTodolist: TodolistsType = {
        id: v1(),
        title: action.payload.title,
      };
      return [newTodolist, ...state];
    }
    case "REMOVE-TODOLIST": {
      return state.filter((todolist) => todolist.id !== action.payload.id);
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((todolist) =>
        todolist.id === action.payload.id
          ? { ...todolist, title: action.payload.title }
          : todolist
      );
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((todolist) =>
        todolist.id === action.payload.id
          ? { ...todolist, filter: action.payload.filter }
          : todolist
      );
    }
    default: {
      return state;
    }
  }
};

export type AddTodolistACType = {
  type: "ADD-TODOLIST";
  payload: {
    title: string;
  };
};

export type RemoveTodolistACType = {
  type: "REMOVE-TODOLIST";
  payload: {
    id: string;
  };
};
export type ChangeTodolistTitleACType = {
  type: "CHANGE-TODOLIST-TITLE";
  payload: {
    id: string;
    title: string;
  };
};
export type ChangeTodolistsFilterACType = {
  type: "CHANGE-TODOLIST-FILTER";
  payload: {
    id: string;
    filter: FilterType;
  };
};

export const addTodolistAC = (title: string) => {
  return { type: "ADD-TODOLIST", payload: { title } } as const;
};
export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const;
};
export const changeTodolistTitleAС = (id: string, title: string) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload: { id, title } } as const;
};
export const changeTodolistsFilterAC = (id: string, filter: FilterType) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload: { id, filter } } as const;
};
