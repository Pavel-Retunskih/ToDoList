import {
  TodolistsType,
  addTodolistAC,
  initialState,
  removeTodolistAC,
  todolistId1,
  todolistsReducer,
  changeTodolistTitleAС,
} from "./todolistsReducer";
const startState: TodolistsType[] = initialState;
test("todolist should have added to state", () => {
  const newState: TodolistsType[] = todolistsReducer(
    startState,
    addTodolistAC("New Title")
  );
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toBe("New Title");
});

test("todolist should have removed from state", () => {
  const newState: TodolistsType[] = todolistsReducer(
    startState,
    removeTodolistAC(todolistId1)
  );
  expect(newState.length).toEqual(1);
});

test("todolist should have new title", () => {
  const newState: TodolistsType[] = todolistsReducer(
    startState,
    changeTodolistTitleAС(todolistId1, "New title")
  );
  expect(newState.length).toEqual(2);
  expect(newState[0].title).toEqual("New title");
});

test("todolist should have new title", () => {
  const newState: TodolistsType[] = todolistsReducer(
    startState,
    changeTodolistTitleAС(todolistId1, "New title")
  );
  expect(newState.length).toEqual(2);
  expect(newState[0].title).toEqual("New title");
});
