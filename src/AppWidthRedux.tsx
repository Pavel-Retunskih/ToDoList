import "./App.css";

import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

import { ToDoList } from "./ToDoList";
import {
  AddTodolistAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer,
} from "./model/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  removeTaskAC,
  tasksReducer,
} from "./model/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./model/store";
import { ToDoListWidthRedux } from "./ToDoListWidthRedux";
export type TasksType = {
  [key: string]: TaskType[];
};
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterType = "all" | "active" | "completed";
function AppWidthRedux() {
  let todolists = useSelector<AppRootStateType, TodolistType[]>(
    (state) => state.todolists
  );
  // let tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks);

  const dispatch = useDispatch();

  //   let [todolists, dispatchToTodolists] = useReducer<Reducer<Array<TodolistType>, ActionsType>>(todolistsReducer, [
  //     {id: todolistId1, title: "What to learn", filter: "all"},
  //     {id: todolistId2, title: "What to buy", filter: "all"}
  // ])

  const removeTask = (todolistID: string, taskID: string) => {
    dispatch(removeTaskAC(taskID, todolistID));
  };
  const addTask = (todolistID: string, title: string) => {
    dispatch(addTaskAC(title, todolistID));
  };
  const changeTaskStatus = (
    todolistID: string,
    taskID: string,
    newIsDone: boolean
  ) => {
    dispatch(changeTaskStatusAC(taskID, newIsDone, todolistID));
  };

  const addTodolist = (title: string) => {
    dispatch(AddTodolistAC(title));
  };
  const deleteTodolist = (todolistId: string) => {
    dispatch(RemoveTodolistAC(todolistId));
  };
  const renameTodolist = (todolistID: string, newTitle: string) => {
    dispatch(ChangeTodolistTitleAC(todolistID, newTitle));
  };
  //**************************RENDER TODOLIST*************************** */
  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map((todolist) => {
        return (
          // <ToDoList
          //   key={todolist.id}
          //   todolistID={todolist.id}
          //   title={todolist.title}
          //   tasks={tasks[todolist.id]}
          //   removeTask={removeTask}
          //   addTask={addTask}
          //   changeTaskStatus={changeTaskStatus}
          //   renameTodolist={renameTodolist}
          //   deleteTodolist={deleteTodolist}
          // />
          <ToDoListWidthRedux todolist={todolist} />
        );
      })}
    </div>
  );
}

export default AppWidthRedux;
