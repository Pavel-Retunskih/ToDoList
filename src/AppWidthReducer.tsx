import { Reducer, useReducer, useState } from "react";
import "./App.css";

import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

import { ToDoList } from "./ToDoList";
import {
  AddTodolistAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  TodolistsActionsType,
  todolistsReducer,
} from "./model/todolists-reducer";
import { TasksActionsType, addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer } from "./model/tasks-reducer";
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
function AppWidthReducer() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const [tasks, dispatchToTasks] = useReducer<Reducer<TasksType, TasksActionsType>>(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS1111", isDone: true },
      { id: v1(), title: "JS1111", isDone: true },
    ],

    [todolistId2]: [
      { id: v1(), title: "HTML&CSS22222", isDone: true },
      { id: v1(), title: "JS2222", isDone: true },
    ],
  });

  const [todolists, dispatchToTodolists] = useReducer<Reducer<Array<TodolistType>, TodolistsActionsType>>(
    todolistsReducer,
    [
      { id: todolistId1, title: "What to learn", filter: "all" },
      { id: todolistId2, title: "What to buy", filter: "all" },
    ]
  );

  //   let [todolists, dispatchToTodolists] = useReducer<Reducer<Array<TodolistType>, ActionsType>>(todolistsReducer, [
  //     {id: todolistId1, title: "What to learn", filter: "all"},
  //     {id: todolistId2, title: "What to buy", filter: "all"}
  // ])

  const removeTask = (todolistID: string, taskID: string) => {
    dispatchToTasks(removeTaskAC(taskID, todolistID));
  };
  const addTask = (todolistID: string, title: string) => {
    dispatchToTasks(addTaskAC(title, todolistID));
  };
  const changeTaskStatus = (todolistID: string, taskID: string, newIsDone: boolean) => {
    dispatchToTasks(changeTaskStatusAC(taskID, newIsDone, todolistID));
  };

  const addTodolist = (title: string) => {
    let action = AddTodolistAC(title);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };
  const deleteTodolist = (todolistId: string) => {
    let action = RemoveTodolistAC(todolistId);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };
  const renameTodolist = (todolistID: string, newTitle: string) => {
    dispatchToTodolists(ChangeTodolistTitleAC(todolistID, newTitle));
  };
  //**************************RENDER TODOLIST*************************** */
  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map((todolist) => {
        return (
          <ToDoList
            key={todolist.id}
            todolistID={todolist.id}
            title={todolist.title}
            tasks={tasks[todolist.id]}
            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            renameTodolist={renameTodolist}
            deleteTodolist={deleteTodolist}
          />
        );
      })}
    </div>
  );
}

export default AppWidthReducer;
