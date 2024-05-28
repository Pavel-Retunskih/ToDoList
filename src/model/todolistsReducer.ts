import { v1 } from "uuid";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};

export let todolistId1 = v1();

export const initialState: TodolistType[] = [
  { id: todolistId1, title: "What to learn", filter: "all" },
  { id: todolistId2, title: "What to buy", filter: "all" },
];
export type FilterType = "all" | "active" | "completed";
export type ActionsTypes =
  | AddTodolistAcType
  | RemoveTodolistAcType
  | ChangeTodolistTitleAcType
  | ChangeTodolistsFilterAcType;

export const todolistsReducer = (
  state: TodolistType[],
  action: ActionsTypes
): TodolistType[] => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      const newTodolist: TodolistType = {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: "all",
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

export type AddTodolistAcType = {
  type: "ADD-TODOLIST";
  payload: {
    title: string;
    todolistId: string;
  };
};

export type RemoveTodolistAcType = {
  type: "REMOVE-TODOLIST";
  payload: {
    id: string;
  };
};
export type ChangeTodolistTitleAcType = {
  type: "CHANGE-TODOLIST-TITLE";
  payload: {
    id: string;
    title: string;
  };
};
export type ChangeTodolistsFilterAcType = {
  type: "CHANGE-TODOLIST-FILTER";
  payload: {
    id: string;
    filter: FilterType;
  };
};

export const addTodolistAc = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: { title, todolistId: v1() },
  } as const;
};
export const removeTodolistAc = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const;
};
export const changeTodolistTitleAc = (id: string, title: string) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload: { id, title } } as const;
};
export const changeTodolistsFilterAc = (id: string, filter: FilterType) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload: { id, filter } } as const;
};
