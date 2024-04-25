import { ChangeEvent, useState } from "react";
import { Button } from "./Button";

type ToDoListPropsType = {
  title: string;
  tasks: Array<ToDoListTasksPropsType>;
  removeTask: (taskId: string) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, newIsDone: boolean) => void;
};

export type ToDoListTasksPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

export function ToDoList({
  title,
  tasks,
  removeTask,
  addTask,
  changeTaskStatus,
}: ToDoListPropsType) {
  // **********New tasks added to the list********************************
  const [newTask, setNewTask] = useState("");
  console.log(newTask);

  const onChangeInputHeandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.currentTarget.value);
  };
  const onClickAddTaskButtonHandler = () => {
    addTask(newTask);
    setNewTask("");
  };

  //**************************************Tasks Filter **********************************/
  type FilterType = "all" | "active" | "completed";
  const [filter, setFilter] = useState<FilterType>("all");

  const getFilteredTasks = (
    filter: FilterType,
    tasks: Array<ToDoListTasksPropsType>
  ) => {
    const filteredTasks = tasks.filter((task) => {
      if (filter === "active") {
        return !task.isDone;
      }
      if (filter === "completed") {
        return task.isDone;
      }
      return true;
    });
    return filteredTasks;
  };
  //************************TODOLIST RENDER********************************* */
  return (
    <div>
      <h2>{title}</h2>
      <input type="text" value={newTask} onChange={onChangeInputHeandler} />
      <Button
        name="+"
        callBack={() => {
          onClickAddTaskButtonHandler();
        }}
      />
      {getFilteredTasks(filter, tasks).length === 0 ? (
        <p>Список задач пуст</p>
      ) : (
        <ul>
          {getFilteredTasks(filter, tasks).map(({ id, title, isDone }) => {
            const onChangeTaskStatusHeandler = (
              event: ChangeEvent<HTMLInputElement>
            ) => {
              changeTaskStatus(id, event.currentTarget.checked);
            };
            return (
              <li key={id}>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={onChangeTaskStatusHeandler}
                />
                <span>{title}</span>
                <button onClick={() => removeTask(id)}>Delete Task</button>
              </li>
            );
          })}
        </ul>
      )}

      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
    </div>
  );
}
