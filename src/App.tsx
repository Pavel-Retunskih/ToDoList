import { ChangeEvent, useState } from "react";
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

  const addTask = (title: string) => {
    setItems([{ id: tasks.length + 1, title: title, isDone: false }, ...tasks]);
  };

  return (
    <div className="App">
      <ToDoList
        title="What to learn"
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
