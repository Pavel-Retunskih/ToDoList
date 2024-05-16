import { useState } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditebleSpan } from "./EditebleSpan";
import s from "./TodoList.module.css";
//***************************TYPES********************* */
type TodoListPropsTypes = {
  todolistTitle: string;
  listFilter: FilterType;
  todolistId: string;
  tasks: TaskType[];
  addTask: (todolistID: string, taskTitle: string) => void;
  removeTask: (todolistID: string, taskId: string) => void;
  removeTodolist: (todolistID: string) => void;
  changeTaskStatus: (
    todolistID: string,
    taskID: string,
    newStatus: boolean
  ) => void;
  changeFilter: (todolistID: string, filter: FilterType) => void;
  editTask: (todolistID: string, taskId: string, taskTitle: string) => void;
  editTodoList: (todolistID: string, title: string) => void;
};
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterType = "all" | "complete" | "active";
//***************************************************** */
export function Todolist({
  todolistTitle,
  todolistId,
  listFilter,
  tasks,
  addTask,
  removeTask,
  removeTodolist,
  changeTaskStatus,
  changeFilter,
  editTask,
  editTodoList,
}: TodoListPropsTypes) {
  //*****************STATES********************************** */
  const [filter, setFilter] = useState<FilterType>(listFilter);
  //******************TODOLIST HEANDLERS******************** */
  const onAddTaskHeandler = (title: string) => {
    addTask(todolistId, title);
  };
  const onEditTodoListHeandler = (title: string) => {
    editTodoList(todolistId, title);
  };

  const onChangeFilterHeandler = (filter: FilterType) => {
    setFilter(filter);
    changeFilter(todolistId, filter);
  };
  const onRemoveTaskHeandler = (taskId: string) => {
    removeTask(todolistId, taskId);
  };

  const onChangeTaskStatusHeandler = (status: boolean, taskId: string) => {
    changeTaskStatus(todolistId, taskId, status);
  };

  const onChangeTaskHeandler = (title: string, taskId: string) => {
    editTask(todolistId, taskId, title);
  };
  //****************GETTING FILTERED TASK LIST FOR TODOLIST********* */
  function getFilteredTasks(tasks: TaskType[], filter: FilterType) {
    let filteredTasks = tasks;
    if (filter === "complete") {
      filteredTasks = tasks.filter((task) => task.isDone);
    }
    if (filter === "active") {
      filteredTasks = tasks.filter((task) => !task.isDone);
    }
    return filteredTasks;
  }
  //*********************GETTING TASK LIST FOR TODOLIST************** */
  const tasksList = getFilteredTasks(tasks, filter).map((task) => {
    //*******************TASK HEANDLERS************************* */

    //**************************TASK************************************ */
    return (
      <li key={task.id} className={task.isDone ? s.isDone : ""}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => onChangeTaskStatusHeandler(task.isDone, task.id)}
        />
        <EditebleSpan
          title={task.title}
          onChange={(title) => onChangeTaskHeandler(title, task.id)}
        />
        <button onClick={() => onRemoveTaskHeandler(task.id)}>x</button>
      </li>
    );
  });
  //*************************RENDER******************************* */
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>
          <EditebleSpan
            title={todolistTitle}
            onChange={(title) => onEditTodoListHeandler(title)}
          />
        </h2>
        <button
          style={{ width: "20px", height: "20px" }}
          onClick={() => removeTodolist(todolistId)}
        >
          x
        </button>
      </div>

      <AddItemForm onChange={(title) => onAddTaskHeandler(title)} />
      {tasksList.length === 0 ? (
        <div>No tasks in list</div>
      ) : (
        <ul>{tasksList}</ul>
      )}

      <button
        onClick={() => onChangeFilterHeandler("all")}
        className={filter === "all" ? s.activeFilter : ""}
      >
        All
      </button>
      <button
        onClick={() => onChangeFilterHeandler("complete")}
        className={filter === "complete" ? s.activeFilter : ""}
      >
        Complete
      </button>
      <button
        onClick={() => onChangeFilterHeandler("active")}
        className={filter === "active" ? s.activeFilter : ""}
      >
        Active
      </button>
    </div>
  );
}
