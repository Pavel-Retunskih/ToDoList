import "./App.css";
import { AddItemForm } from "./AddItemForm";
import { ToDoList } from "./ToDoList";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAC, changeTaskStatusAC, removeTaskAC } from "./model/tasks-reducer";
import { AddTodolistAC, ChangeTodolistTitleAC } from "./model/todolists-reducer";
import { AppRootStateType } from "./store/store";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box/Box";

export type TasksType = {
  [key: string]: Task[];
};
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};
export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterType = "all" | "active" | "completed";

//***************************************************** */
function App() {
  const todolists = useSelector((state: AppRootStateType) => state.todolists);
  console.log(todolists);

  const tasks = useSelector((state: AppRootStateType) => state.tasks);
  const dispatch = useDispatch();
  // let todolistId1 = v1();
  // let todolistId2 = v1();
  // const [tasks, setTasks] = useState<TasksType>({
  //   [todolistId1]: [
  //     { id: v1(), title: "HTML&CSS1111", isDone: true },
  //     { id: v1(), title: "JS1111", isDone: true },
  //   ],

  //   [todolistId2]: [
  //     { id: v1(), title: "HTML&CSS22222", isDone: true },
  //     { id: v1(), title: "JS2222", isDone: true },
  //   ],
  // });
  // const [todolists, setTodolists] = useState<TodolistType[]>([
  //   { id: todolistId1, title: "What to learn", filter: "all" },
  //   { id: todolistId2, title: "What to buy", filter: "all" },
  // ]);
  const removeTask = (todolistID: string, taskID: string) => {
    dispatch(removeTaskAC(todolistID, taskID));
  };
  const addTask = (todolistID: string, title: string) => {
    dispatch(addTaskAC(todolistID, title));
  };
  const changeTaskStatus = (todolistID: string, taskID: string, newIsDone: boolean) => {
    dispatch(changeTaskStatusAC(todolistID, taskID, newIsDone));
  };
  const addTodolist = (title: string) => {
    dispatch(AddTodolistAC(title));
  };

  const renameTodolist = (todolistID: string, newTitle: string) => {
    dispatch(ChangeTodolistTitleAC(todolistID, newTitle));
  };
  //**************************RENDER TODOLIST*************************** */
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <AddItemForm addItem={addTodolist} />
        <Box sx={{ display: "flex", gap: "20px", margin: "30px auto", flexWrap: "wrap", width: "1448px" }}>
          {todolists.map((todolist) => {
            return (
              <ToDoList
                key={todolist.id}
                todolistID={todolist.id}
                title={todolist.title}
                tasks={tasks[todolist.id]}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                renameTodolist={renameTodolist}
              />
            );
          })}
        </Box>
      </Box>
    </div>
  );
}

export default App;
