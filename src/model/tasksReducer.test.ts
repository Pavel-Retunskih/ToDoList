import { v1 } from "uuid";
import {
  TasksStateType,
  addTaskAc,
  changeTaskStatusAc,
  initialTasksState,
  removeTaskAc,
  tasksReducer,
} from "./tasksReducer";

const startState: TasksStateType = initialTasksState;
export let todolistId1 = v1();
test("task should have added to tasks state", () => {
  const newState: TasksStateType = tasksReducer(
    startState,
    addTaskAc(todolistId1, "New Task")
  );
  expect(newState[todolistId1].data.length).toEqual(3);
  expect(newState[todolistId1].data[0].title).toBe("New Task");
  expect(newState[todolistId1].data[0].isDone).toBe(false);
});
test("task should have removed from tasks state", () => {
  const newState: TasksStateType = tasksReducer(
    startState,
    removeTaskAc(todolistId1, "989s8hdf9s8hdf98shf9")
  );
  expect(newState[todolistId1].data.length).toEqual(1);
});
test("task should have changed status", () => {
  const newState: TasksStateType = tasksReducer(
    startState,
    changeTaskStatusAc(todolistId1, "989s8hdf9s8hdf98shf9", true)
  );
  expect(newState[todolistId1].data.length).toEqual(2);
  expect(newState[todolistId1].data[0].isDone).toBe(true);
});
