import { ChangeEvent, useReducer, useState } from "react";
import "./App.css";
import { FilterType, ToDoList, ToDoListTasksPropsType } from "./ToDoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  addTodolistAc,
  initialState,
  todolistsReducer,
} from "./model/todolistsReducer";

function App() {
  type TasksStateType = {
    [key: string]: DataType;
  };
  type DataType = {
    data: ToDoListTasksPropsType[];
  };
  let todolistId1 = v1();
  let todolistId2 = v1();

  const [todolists, dispachTodolist] = useReducer(
    todolistsReducer,
    initialState
  );

  let [tasks, setTasks] = useState<TasksStateType>({
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
  const addTodolist = (title: string) => {
    dispachTodolist(addTodolistAc(title));
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
