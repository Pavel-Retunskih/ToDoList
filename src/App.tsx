import { ChangeEvent, useState } from "react";
import "./App.css";
import { ToDoList, ToDoListTasksPropsType } from "./ToDoList";
import { v1 } from "uuid";

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
      <ToDoList
        title="What to learn"
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
