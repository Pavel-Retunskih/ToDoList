import { TasksType as TasksType } from "../App";
import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;
export type TasksActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusType
  | ChangeTaskTitleType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksType = {};

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId),
      };
    }
    case "ADD-TASK": {
      const newTask = { id: v1(), title: action.title, isDone: false };
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]],
      };
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, isDone: action.newStatus } : t
        ),
      };
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, title: action.newTitle } : t
        ),
      };
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      let newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: "REMOVE-TASK", taskId, todolistId } as const;
};
export const addTaskAC = (title: string, todolistId: string) => {
  return { type: "ADD-TASK", title, todolistId } as const;
};
export const changeTaskStatusAC = (taskId: string, newStatus: boolean, todolistId: string) => {
  return { type: "CHANGE-TASK-STATUS", taskId, newStatus, todolistId } as const;
};
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
  return { type: "CHANGE-TASK-TITLE", taskId, newTitle, todolistId } as const;
};
