import { ChangeEvent, useState } from "react";
import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";

type ToDoListPropsType = {
  title: string;
  tasks: Array<ToDoListTasksPropsType>;
  todolistID: string;
  removeTask: (todolistID: string, taskID: string) => void;
  addTask: (todolistID: string, title: string) => void;
  changeTaskStatus: (
    todolistID: string,
    taskId: string,
    newIsDone: boolean
  ) => void;
};

export type ToDoListTasksPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterType = "all" | "active" | "completed";

export function ToDoList({
  title,
  tasks,
  removeTask,
  addTask,
  changeTaskStatus,
  todolistID,
}: ToDoListPropsType) {
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
  const addTaskHeandler = (newTaskTitle: string) => {
    addTask(todolistID, newTaskTitle);
  };
  //************************TODOLIST RENDER********************************* */
  return (
    <div>
      <h2>{title}</h2>
      <AddItemForm addItem={addTaskHeandler} />
      {getFilteredTasks(filter, tasks).length === 0 ? (
        <p>Список задач пуст</p>
      ) : (
        <ul>
          {getFilteredTasks(filter, tasks).map(({ id, title, isDone }) => {
            const onChangeTaskStatusHeandler = (
              event: ChangeEvent<HTMLInputElement>
            ) => {
              changeTaskStatus(todolistID, id, event.currentTarget.checked);
            };
            return (
              <li key={id}>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={onChangeTaskStatusHeandler}
                />
                <span>{title}</span>
                <button onClick={() => removeTask(todolistID, id)}>x</button>
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