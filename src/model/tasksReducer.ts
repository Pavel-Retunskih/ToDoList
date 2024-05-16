import { v1 } from "uuid";
import { ToDoListTasksPropsType } from "../ToDoList";
import { todolistId1, todolistId2 } from "./todolistsReducer";

export type TasksStateType = {
  [key: string]: DataType;
};
type DataType = {
  data: ToDoListTasksPropsType[];
};

export const initialState: TasksStateType = {
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

export const tasksReducer = (state: TasksStateType, action: any) => {
  switch (action.type) {
    case "xxx": {
      return state;
    }
    default: {
      return state;
    }
  }
};
