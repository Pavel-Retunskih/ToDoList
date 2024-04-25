import { ChangeEvent, useState } from "react";
import "./App.css";
import { FilterType, ToDoList, ToDoListTasksPropsType } from "./ToDoList";
import { v1 } from "uuid";

function App() {
  type TodolistsType = {
    id: string;
    title: string;
  };
  type TasksStateType = {
    [key: string]: DataType;
  };
  type DataType = {
    data: ToDoListTasksPropsType[];
    filter: FilterType;
  };
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistId1, title: "What to learn" },
    { id: todolistId2, title: "What to buy" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: {
      data: [
        { id: v1(), title: "HTML&CSS1111", isDone: true },
        { id: v1(), title: "JS1111", isDone: true },
      ],
      filter: "all",
    },
    [todolistId2]: {
      data: [
        { id: v1(), title: "HTML&CSS22222", isDone: true },
        { id: v1(), title: "JS2222", isDone: true },
      ],
      filter: "all",
    },
  });

  const removeTask = (todolistID: string, taskID: string) => {
    setTasks({
      ...tasks,
      [todolistID]: {
        ...tasks[todolistID],
        data: tasks[todolistID].data.filter((task) => task.id !== taskID),
      },
    });
  };
  const addTask = (todolistID: string, title: string) => {
    let newTask = { id: v1(), title, isDone: false };
    setTasks({
      ...tasks,
      [todolistID]: {
        ...tasks[todolistID],
        data: [newTask, ...tasks[todolistID].data],
      },
    });
  };
  const changeTaskStatus = (
    todolistID: string,
    taskID: string,
    newIsDone: boolean
  ) => {
    setTasks({
      ...tasks,
      [todolistID]: {
        ...tasks[todolistID],
        data: tasks[todolistID].data.map((task) =>
          task.id === taskID ? { ...task, isDone: newIsDone } : task
        ),
      },
    });
  };
  //**************************RENDER TODOLIST*************************** */
  return (
    <div className="App">
      {todolists.map((todolist) => {
        return (
          <ToDoList
            key={todolist.id}
            todolistID={todolist.id}
            title={todolist.title}
            tasks={tasks[todolist.id].data}
            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
          />
        );
      })}
    </div>
  );
}

export default App;
