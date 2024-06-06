import {addTodolist, changeTodoFilter, removeTodolist, todosReducer} from "../store/reducers/todos-reducer";
import {TodoListType} from "../store/store";


let startState: Array<TodoListType>;

let todolistID1: string;
let todolistID2: string;

beforeEach(() => {
  todolistID1 = "1";
  todolistID2 = "2";

  startState = [
    {id: todolistID1, title: "What to learn", status: "All"},
    {id: todolistID2, title: "What to buy", status: "All"},
  ];
});


//test for ADD-TODOLIST
test("ADD-TODOLIST: correct todolist should be added", () => {

  const newTodolist: TodoListType = {id: "3", title: "NewTodo", status: "All"};

  const endState = todosReducer(startState, addTodolist(newTodolist));
  expect(endState.length).toBe(3);
  expect(endState[0].id).toBe("3");
  expect(endState[0].title).toBe("NewTodo");

});

//test for REMOVE-TODOLIST
test("REMOVE-TODOLIST: correct todolist should be removed", () => {

  const endState = todosReducer(startState, removeTodolist(todolistID1));
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);

  const endState1 = todosReducer(startState, removeTodolist(todolistID2));
  expect(endState1.length).toBe(1);
  expect(endState1[0].id).toBe(todolistID1);
});

//test for CHANGE-TODOLIST-FILTER
test("CHANGE-TODOLIST-FILTER: status should be updated in correct todolist", () => {

  const endState = todosReducer(startState, changeTodoFilter(todolistID2, "Active"));
  expect(endState[0].status).toBe("All");
  expect(endState[1].status).toBe("Active");
  expect(endState.length).toBe(2);

});