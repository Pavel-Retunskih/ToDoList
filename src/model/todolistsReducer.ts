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
    default: {
      return state;
    }
  }
};

type AddTodolistACType = {
  type: string;
  payload: {
    title: string;
  };
};

type RemoveTodolistACType = {
  type: string;
  payload: {
    id: string;
  };
};
type ChangeTodolistTitleACType = {
  type: string;
  payload: {
    id: string;
    title: string;
  };
};
type ChangeTodolistsFilterACType = {
  type: string;
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
