
import { useState } from "react";
import "./App.css";
import { FilterType, TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { ParentComponent } from "./New";

function App() {
  type TodolistsType = {
    id: string;
    title: string;
  };
  type TasksType = {
    [key: string]: DataType;
  };
  type DataType = {
    data: TaskType[];
    filter: FilterType;
  };

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistId1, title: "What to learn" },
    { id: todolistId2, title: "What to buy" },
  ]);

  let [tasks, setTasks] = useState<TasksType>({
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

  //********************ADD TODOLIST**************************** */
  const addTodoList = (title: string) => {
    let newTodoList = { id: v1(), title };
    setTodolists([newTodoList, ...todolists]);
    setTasks({
      ...tasks,
      [newTodoList.id]: {
        data: [],
        filter: "all",
      },
    });
  };
  ///*****************EDIT TODOLIST TITLE********************* */
  const editTodoList = (todolistID: string, title: string) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistID ? { ...todolist, title } : todolist
      )
    );
  };
  //******************ADD TASK******************************** */
  const addTask = (todolistID: string, taskTitle: string) => {
    const newTask = { id: v1(), title: taskTitle, isDone: false };
    setTasks({
      ...tasks,
      [todolistID]: {
        ...tasks[todolistID],
        data: [newTask, ...tasks[todolistID].data],
      },
    });
  };
  //********************EDIT TASK TITLE************************************************ */
  const editTask = (todolistID: string, taskID: string, taskTitle: string) => {
    setTasks({
      ...tasks,
      [todolistID]: {
        ...tasks[todolistID],
        data: tasks[todolistID].data.map((task) =>
          task.id === taskID ? { ...task, title: taskTitle } : task
        ),
      },
    });
  };
  //******************REMOVE TASK******************************** */
  const removeTask = (todolistID: string, taskID: string) => {
    setTasks({
      ...tasks,
      [todolistID]: {
        ...tasks[todolistID],
        data: tasks[todolistID].data.filter((task) => task.id !== taskID),
      },
    });
  };
  //******************REMOVE TASK******************************** */
  const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter((todo) => todo.id !== todolistID));
  };
  //******************CHANGE TASK STATUS******************************** */
  const changeTaskStatus = (
    todolistID: string,
    taskID: string,
    newStatus: boolean
  ) => {
    setTasks({
      ...tasks,
      [todolistID]: {
        ...tasks[todolistID],
        data: tasks[todolistID].data.map((task) =>
          task.id === taskID ? { ...task, isDone: !newStatus } : task
        ),
      },
    });
  };
  //******************CHANGE FILTER TASKS LIST******************************** */
  const changeFilter = (todolistID: string, filter: FilterType) => {
    setTasks({
      ...tasks,
      [todolistID]: { ...tasks[todolistID], filter },
    });
  };

  //***********************RENDER************************************* */
  return (
    <div className="App">
      <ParentComponent />
      <AddItemForm onChange={addTodoList} />

      {todolists.length === 0 ? (
        <div>No todolists</div>
      ) : (
        todolists.map((todolist) => (
          <Todolist
            key={todolist.id}
            editTodoList={editTodoList}
            todolistTitle={todolist.title}
            tasks={tasks[todolist.id].data}
            todolistId={todolist.id}
            listFilter={tasks[todolist.id].filter}
            addTask={addTask}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            changeFilter={changeFilter}
            editTask={editTask}
            removeTodolist={removeTodolist}
          />
        ))
      )}


function App() {
  const [tasks, setItems] = useState<Array<ToDoListTasksPropsType>>([
    { id: v1(), title: "Css", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  const removeTask = (taskId: string) => {
    setItems(tasks.filter((item) => item.id !== taskId));
  };

  const addTask = (title: string) => {
    setItems([{ id: v1(), title: title, isDone: false }, ...tasks]);
  };
  const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.isDone = newIsDone;
      setItems([...tasks]);
    }
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />

    </div>
  );


export default App;
