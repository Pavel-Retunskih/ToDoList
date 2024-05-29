import { ChangeEvent, useState } from "react";
import { AddItemForm } from "./AddItemForm";

import { EditableSpan } from "./EditableSpan";
import { FilterType, TaskType, TodolistType } from "./App";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./model/store";

type ToDoListPropsType = {
  todolist: TodolistType;
};

export function ToDoListWidthRedux({ todolist }: ToDoListPropsType) {
  const [filter, setFilter] = useState<FilterType>("all");

  const { id, title } = todolist;
  const tasks = useSelector<AppRootStateType, TaskType[]>(
    (state) => state.tasks[id]
  );
  const getFilteredTasks = (filter: FilterType, tasks: TaskType[]) => {
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
  const addTaskHandler = (newTaskTitle: string) => {
    addTask(todolistID, newTaskTitle);
  };
  //************************TODOLIST RENDER********************************* */
  return (
    <div>
      <div>
        <EditableSpan
          oldTitle={title}
          setItem={(newTitle) => renameTodolist(todolistID, newTitle)}
        />
        <button onClick={() => deleteTodolist(todolistID)}>x</button>
      </div>
      <AddItemForm addItem={addTaskHandler} />

      {getFilteredTasks(filter, tasks).length === 0 ? (
        <p>Список задач пуст</p>
      ) : (
        <ul>
          {getFilteredTasks(filter, tasks).map(({ id, title, isDone }) => {
            const onChangeTaskStatusHandler = (
              event: ChangeEvent<HTMLInputElement>
            ) => {
              changeTaskStatus(todolistID, id, event.currentTarget.checked);
            };
            return (
              <li key={id}>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={onChangeTaskStatusHandler}
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
