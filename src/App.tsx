import { ChangeEvent, useReducer, useState } from "react";
import "./App.css";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { ToDoList } from "./ToDoList";

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

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS1111", isDone: true },
      { id: v1(), title: "JS1111", isDone: true },
    ],

    [todolistId2]: [
      { id: v1(), title: "HTML&CSS22222", isDone: true },
      { id: v1(), title: "JS2222", isDone: true },
    ],
  });
  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const removeTask = (todolistID: string, taskID: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].filter((task) => task.id !== taskID),
    });
  };
  const addTask = (todolistID: string, title: string) => {
    let newTask = { id: v1(), title, isDone: false };
    setTasks({
      ...tasks,
      [todolistID]: [newTask, ...tasks[todolistID]],
    });
  };
  const changeTaskStatus = (
    todolistID: string,
    taskID: string,
    newIsDone: boolean
  ) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((task) =>
        task.id === taskID ? { ...task, isDone: newIsDone } : task
      ),
    });
  };
  const addTodolist = (title: string) => {
    const newTodolist: TodolistType = { id: v1(), title, filter: "all" };
    setTodolists([...todolists, newTodolist]);
    setTasks({ ...tasks, [newTodolist.id]: [] });
  };
  const renameTodolist = (todolistID: string, newTitle: string) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistID ? { ...todolist, title: newTitle } : todolist
      )
    );
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
          />
        );
      })}
    </div>
  );
}

export default App;
