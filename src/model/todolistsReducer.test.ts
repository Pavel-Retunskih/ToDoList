import { TodolistsType } from "../App";
import { addTodolistAc, todolistsReducer } from "./todolistsReducer";

let todolistId1 = "78has087dfhs80a7dfg";
let todolistId2 = "807saghfsadh7f807sadfh8";

const StartState: TodolistsType[] = [
  { id: todolistId1, title: "What to learn" },
  { id: todolistId2, title: "What to buy" },
];

test("should add new todolist to todolists array", () => {
  const action = addTodolistAc("New todolist");
  const newState: TodolistsType[] = todolistsReducer(StartState, action);

  expect(newState.length).toBe(3);
  expect(newState[0].title).toBe("New todolist");
  expect(typeof newState[0].id).toBe("string");
  expect(newState[1].title).toBe("What to learn");
  expect(newState[2].title).toBe("What to buy");
});

// test("should remove todolist from todolists array", () => {
//   const action = removeTodolistAc("78has087dfhs80a7dfg");
//   const newState = todolistsReducer(StartState, action);

//   expect(newState.length).toBe(1);
//   expect(newState[0].id).toBe("807saghfsadh7f807sadfh8");
// });

// test("should rename todolist title", () => {
//   const action = renameTodolistAc("78has087dfhs80a7dfg", "New todolist title");
//   const newState = todolistsReducer(StartState, action);

//   expect(newState.length).toBe(2);
//   expect(newState[0].title).toBe("New todolist title");
//   expect(newState[1].title).toBe("What to buy");
// });
