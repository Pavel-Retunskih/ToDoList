import { ChangeEvent, MouseEvent, useState } from "react";

import { EditableSpan } from "./EditableSpan";
import { FilterType, Task } from "./App";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { AddItemForm } from "./AddItemForm";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type ToDoListPropsType = {
  title: string;
  tasks: Task[];
  todolistID: string;
  removeTask: (todolistID: string, taskID: string) => void;
  addTask: (todolistID: string, title: string) => void;
  changeTaskStatus: (todolistID: string, taskId: string, newIsDone: boolean) => void;
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

  const handleFilter = (e: MouseEvent<HTMLElement>, value: FilterType) => {
    setFilter(value);
  };

  const getFilteredTasks = (filter: FilterType, tasks: Task[]) => {
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
    <Box sx={{ width: "300px" }}>
      <Paper
        elevation={2}
        square
        sx={{
          padding: "10px 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <EditableSpan oldTitle={title} setItem={(newTitle) => renameTodolist(todolistID, newTitle)} />
        <AddItemForm addItem={addTaskHandler} />
        {getFilteredTasks(filter, tasks).length === 0 ? (
          <p>Список задач пуст</p>
        ) : (
          <List sx={{ width: "100%" }}>
            {getFilteredTasks(filter, tasks).map(({ id, title, isDone }) => {
              const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(todolistID, id, event.currentTarget.checked);
              };
              return (
                <ListItem key={id} disablePadding divider>
                  <input type="checkbox" checked={isDone} onChange={onChangeTaskStatusHandler} />
                  <span>{title}</span>
                  <IconButton size="small" onClick={() => removeTask(todolistID, id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        )}
        <ToggleButtonGroup exclusive value={filter} onChange={handleFilter}>
          <ToggleButton color="primary" value={"all"}>
            All
          </ToggleButton>
          <ToggleButton color="warning" value={"active"}>
            Active
          </ToggleButton>
          <ToggleButton color="success" value={"completed"}>
            Completed
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </Box>
  );
}
