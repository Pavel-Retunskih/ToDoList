import { TodolistsType } from "../App";
import { v1 } from "uuid";

type AddTodolistAcType = {
  type: "ADD-TODOLIST";
  payload: {
    title: string;
    id: string;
  };
};
type RemoveTodolistAcType = {
  type: "REMOVE-TODOLIST";
  payload: {
    id: string;
  };
};
type ChangeTittleTodolistAcType = {
  type: "CHANGE-TITLE-TODOLIST";
  payload: {
    title: string;
    id: string;
  };
};
type todolistsReducerActionsType =
  | AddTodolistAcType
  | RemoveTodolistAcType
  | ChangeTittleTodolistAcType;

export const todolistsReducer = (
  state: TodolistsType[],
  action: todolistsReducerActionsType
) => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      return state;
    }
    case "REMOVE-TODOLIST": {
      return state;
    }
    case "CHANGE-TITLE-TODOLIST": {
      return state;
    }

    default:
      return state;
  }
};

export const addTodolistAc = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      title,
      id: v1(),
    },
  } as const;
};
