import { v1 } from "uuid";
import { AddTodolistAcType, RemoveTodolistAcType } from "./todolistsReducer";

let todolistId1 = v1();
let todolistId2 = v1();

export type TasksStateType = {
  [key: string]: DataType;
};
type DataType = {
  data: TaskType[];
};
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export const initialTasksState: TasksStateType = {
  [todolistId1]: {
    data: [
      { id: v1(), title: "HTML&CSS1111", isDone: true },
      { id: v1(), title: "JS1111", isDone: true },
    ],
  },
  [todolistId2]: {
    data: [
      { id: v1(), title: "HTML&CSS22222", isDone: true },
      { id: v1(), title: "JS2222", isDone: true },
    ],
  },
};

type TaskReducerActionTypes =
  | addTaskAcType
  | removeTaskAcType
  | changeTaskStatusAcType
  | AddTodolistAcType
  | RemoveTodolistAcType;

export const tasksReducer = (
  state: TasksStateType,
  action: TaskReducerActionTypes
): TasksStateType => {
  switch (action.type) {
    case "ADD-TASK": {
      const newTask = {
        id: v1(),
        title: action.payload.title,
        isDone: action.payload.isDone,
      };
      return {
        ...state,
        [action.payload.todolistId]: {
          ...state[action.payload.todolistId],
          data: [...state[action.payload.todolistId].data, newTask],
        },
      };
    }
    case "REMOVE-TASK": {
      return state;
    }
    case "CHANGE-TASK-STATUS": {
      return state;
    }
    case "REMOVE-TODOLIST": {
      return state;
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolistId]: { data: [] } };
    }
    default: {
      return state;
    }
  }
};
export type addTaskAcType = {
  type: "ADD-TASK";
  payload: {
    todolistId: string;
    title: string;
    isDone: boolean;
  };
};
export type removeTaskAcType = {
  type: "REMOVE-TASK";
  payload: {
    todolistId: string;
    taskId: string;
  };
};
export type changeTaskStatusAcType = {
  type: "CHANGE-TASK-STATUS";
  payload: {
    todolistId: string;
    taskId: string;
    newStatus: boolean;
  };
};
export type addTodolist = {
  type: "ADD-TODOLIST";
  payload: {
    todolistId: string;
  };
};
export const addTaskAc = (todolistId: string, title: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      todolistId,
      title,
      isDone: false,
    },
  } as const;
};
export const removeTaskAc = (todolistId: string, taskId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      todolistId,
      taskId,
    },
  } as const;
};
export const changeTaskStatusAc = (
  todolistId: string,
  taskId: string,
  newStatus: boolean
) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: {
      todolistId,
      taskId,
      newStatus,
    },
  } as const;
};
