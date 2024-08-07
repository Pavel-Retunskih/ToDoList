import { TasksType as TasksType } from "../App";
import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;
type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusType
  | ChangeTaskTitleType
  | AddTodolistActionType
  | RemoveTodolistActionType;
const initialState: TasksType = {};
export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
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

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return { type: "REMOVE-TASK", taskId, todolistId } as const;
};
export const addTaskAC = (todolistId: string, title: string) => {
  return { type: "ADD-TASK", title, todolistId } as const;
};
export const changeTaskStatusAC = (todolistId: string, taskId: string, newStatus: boolean) => {
  return { type: "CHANGE-TASK-STATUS", taskId, newStatus, todolistId } as const;
};
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
  return { type: "CHANGE-TASK-TITLE", taskId, newTitle, todolistId } as const;
};
