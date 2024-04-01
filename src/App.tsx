import { useState } from "react";
import "./App.css";
import { ToDoList, ToDoListTasksPropsType } from "./ToDoList";

function App() {
  const [tasks, setItems] = useState<Array<ToDoListTasksPropsType>>([
    { id: 1, title: "Css", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ]);

  const removeTask = (taskId: number) => {
    setItems(tasks.filter((item) => item.id !== taskId));
  };

  return (
    <div className="App">
      <ToDoList title="What to learn" tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;
