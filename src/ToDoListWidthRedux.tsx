import { ChangeEvent, useState } from "react";
import { AddItemForm } from "./AddItemForm";

import { EditableSpan } from "./EditableSpan";
import { FilterType, TaskType, TodolistType } from "./App";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./model/store";
import {
  addTaskAC,
  changeTaskStatusAC,
  removeTaskAC,
} from "./model/tasks-reducer";
import {
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
} from "./model/todolists-reducer";

type ToDoListPropsType = {
  todolist: TodolistType;
};

export function ToDoListWidthRedux({ todolist }: ToDoListPropsType) {
  const [filter, setFilter] = useState<FilterType>("all");
  const { id, title } = todolist;
  const tasks = useSelector<AppRootStateType, TaskType[]>(
    (state) => state.tasks[id]
  );
  const dispatch = useDispatch();
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
  const removeTask = (todolistID: string, taskID: string) => {
    dispatch(removeTaskAC(taskID, todolistID));
  };
  const addTask = (todolistID: string, title: string) => {
    dispatch(addTaskAC(title, todolistID));
  };
  const changeTaskStatus = (
    todolistID: string,
    taskID: string,
    newIsDone: boolean
  ) => {
    dispatch(changeTaskStatusAC(taskID, newIsDone, todolistID));
  };
  const deleteTodolist = (todolistId: string) => {
    dispatch(RemoveTodolistAC(todolistId));
  };
  const renameTodolist = (todolistID: string, newTitle: string) => {
    dispatch(ChangeTodolistTitleAC(todolistID, newTitle));
  };
  //************************TODOLIST RENDER********************************* */
  return (
    <div>
      <div>
        <EditableSpan
          oldTitle={title}
          setItem={(newTitle) => renameTodolist(todolist.id, newTitle)}
        />
        <button onClick={() => deleteTodolist(todolist.id)}>x</button>
      </div>
      <AddItemForm addItem={(title) => addTask(todolist.id, title)} />

      {getFilteredTasks(filter, tasks).length === 0 ? (
        <p>Список задач пуст</p>
      ) : (
        <ul>
          {getFilteredTasks(filter, tasks).map(({ id, title, isDone }) => {
            const onChangeTaskStatusHandler = (
              event: ChangeEvent<HTMLInputElement>
            ) => {
              changeTaskStatus(todolist.id, id, event.currentTarget.checked);
            };
            return (
              <li key={id}>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={onChangeTaskStatusHandler}
                />
                <span>{title}</span>
                <button onClick={() => removeTask(todolist.id, id)}>x</button>
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
