import { ChangeEvent, useState } from "react";
import { EditableSpan } from "./EditableSpan";
import { FilterType, TaskType } from "./App";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { AddItemForm } from "./AddItemForm";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

type ToDoListPropsType = {
  title: string;
  tasks: TaskType[];
  todolistID: string;
  removeTask: (todolistID: string, taskID: string) => void;
  addTask: (todolistID: string, title: string) => void;
  changeTaskStatus: (
    todolistID: string,
    taskId: string,
    newIsDone: boolean
  ) => void;
  renameTodolist: (todolistID: string, newTitle: string) => void;
};

export function ToDoList({
  title,
  tasks,
  removeTask,
  addTask,
  changeTaskStatus,
  todolistID,
  renameTodolist,
}: ToDoListPropsType) {
  const [filter, setFilter] = useState<FilterType>("all");

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
    <Box>
      <Paper elevation={2} square>
        <EditableSpan
          oldTitle={title}
          setItem={(newTitle) => renameTodolist(todolistID, newTitle)}
        />
        <AddItemForm addItem={addTaskHandler} />
        {getFilteredTasks(filter, tasks).length === 0 ? (
          <p>Список задач пуст</p>
        ) : (
          <List>
            {getFilteredTasks(filter, tasks).map(({ id, title, isDone }) => {
              const onChangeTaskStatusHandler = (
                event: ChangeEvent<HTMLInputElement>
              ) => {
                changeTaskStatus(todolistID, id, event.currentTarget.checked);
              };
              return (
                <ListItem key={id} disablePadding divider>
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={onChangeTaskStatusHandler}
                  />
                  <span>{title}</span>
                  <IconButton
                    size="small"
                    onClick={() => removeTask(todolistID, id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        )}

        <Button
          variant="outlined"
          size="small"
          color="success"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
      </Paper>
    </Box>
  );
}
