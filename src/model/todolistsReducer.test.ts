import {
  TodolistsType,
  addTodolistAc,
  initialState,
  removeTodolistAc,
  todolistId1,
  todolistsReducer,
  changeTodolistTitleAc,
  changeTodolistsFilterAc,
} from "./todolistsReducer";
const startState: TodolistsType[] = initialState;
test("todolist should have added to state", () => {
  const newState: TodolistsType[] = todolistsReducer(
    startState,
    addTodolistAc("New Title")
  );
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toBe("New Title");
  expect(newState[0].filter).toBe("all");
});

test("todolist should have removed from state", () => {
  const newState: TodolistsType[] = todolistsReducer(
    startState,
    removeTodolistAc(todolistId1)
  );
  expect(newState.length).toEqual(1);
});

test("todolist should have new title", () => {
  const newState: TodolistsType[] = todolistsReducer(
    startState,
    changeTodolistTitleAc(todolistId1, "New title")
  );
  expect(newState.length).toEqual(2);
  expect(newState[0].title).toEqual("New title");
});

test("todolist should have new title", () => {
  const newState: TodolistsType[] = todolistsReducer(
    startState,
    changeTodolistsFilterAc(todolistId1, "completed")
  );
  expect(newState.length).toEqual(2);
  expect(newState[0].filter).toEqual("completed");
});
