import {
  TasksStateType,
  initialTasksState,
  tasksReducer,
} from "./tasksReducer";
import {
  TodolistType,
  addTodolistAc,
  initialState as initialTodolistsState,
  removeTodolistAc,
  todolistId1,
  todolistsReducer,
  changeTodolistTitleAc,
  changeTodolistsFilterAc,
} from "./todolistsReducer";

const startTodolistsState: TodolistType[] = initialTodolistsState;
const startTasksState: TasksStateType = initialTasksState;
test("todolist should have added to state with empty array of tasks", () => {
  const newTodolistsState: TodolistType[] = todolistsReducer(
    startTodolistsState,
    addTodolistAc("New Title")
  );
  const newTasksState: TasksStateType = tasksReducer(
    startTasksState,
    addTodolistAc("ADD-TODOLIST")
  );

  expect(newTodolistsState.length).toEqual(3);
  expect(newTodolistsState[0].title).toBe("New Title");
  expect(newTodolistsState[0].filter).toBe("all");
  expect(newTasksState[newTodolistsState[1].id].data.length).toEqual(0);
});

test("todolist should have removed from state", () => {
  const newState: TodolistType[] = todolistsReducer(
    startTodolistsState,
    removeTodolistAc(todolistId1)
  );
  expect(newState.length).toEqual(1);
});

test("todolist should have new title", () => {
  const newState: TodolistType[] = todolistsReducer(
    startTodolistsState,
    changeTodolistTitleAc(todolistId1, "New title")
  );
  expect(newState.length).toEqual(2);
  expect(newState[0].title).toEqual("New title");
});

test("todolist should have new title", () => {
  const newState: TodolistType[] = todolistsReducer(
    startTodolistsState,
    changeTodolistsFilterAc(todolistId1, "completed")
  );
  expect(newState.length).toEqual(2);
  expect(newState[0].filter).toEqual("completed");
});
