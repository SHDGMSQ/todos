import {
  addTask,
  changeTaskStatus,
  clearCompletedTasks,
  removeTask,
  setTasks,
  taskReducer
} from "../store/reducers/task-reducer";
import {TaskType, TodoListType} from "../store/store";
import {addTodolist, removeTodolist} from "../store/reducers/todos-reducer";


let startState: { [key: string]: Array<TaskType> };

beforeEach(() => {
  startState = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: true},
      {id: "2", title: "milk", isDone: false},
      {id: "3", title: "tea", isDone: true}
    ]
  };
});

//test for ADD-TODOLIST
test('ADD-TODOLIST: correct task empty array should be added', () => {

  const newTodo: TodoListType = {id: "todolistId3", title: "newTodo", status: "All"}

  const action = addTodolist(newTodo);

  const endState = taskReducer(startState, action)

  expect(endState["todolistId3"]).toBeDefined();
  expect(endState["todolistId3"].length).toBe(0);
})

//test for REMOVE-TODOLIST
test('REMOVE-TODOLIST: correct task array should be removed', () => {

  const action = removeTodolist("todolistId2");

  const endState = taskReducer(startState, action)

  expect(endState["todolistId2"]).toBeUndefined();
  expect(endState["todolistId1"]).toBeDefined();
  expect(endState["todolistId1"][0].id).toBe("1");
})

//test for SET-TASKS
test('SET-TASKS: correct tasks should be added correctly', () => {

  const action = setTasks("todolistId3", [{id: "new1", title: "newTask", isDone: false}]);

  const endState = taskReducer(startState, action)

  expect(endState["todolistId3"][0].id).toBe("new1");
  expect(endState["todolistId3"][0].title).toBe("newTask");
})

//test for REMOVE-TASK
test('REMOVE-TASK: correct task should be added to correct array', () => {

  const action = removeTask("todolistId2", "1");

  const endState = taskReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"][0].id).toBe("2");
})

//test for ADD-TASK
test('ADD-TASK: correct task should be added to correct array', () => {

  const action = addTask("todolistId2", {id: "4", title: "newTask", isDone: false});

  const endState = taskReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe('newTask');
  expect(endState["todolistId2"][0].isDone).toBe(false);
})

//test for CHANGE-TASK-STATUS
test('CHANGE-TASK-STATUS: isDone should be update in correct task', () => {

  const action = changeTaskStatus("todolistId2", "3", false);

  const endState = taskReducer(startState, action)

  expect(endState["todolistId1"][2].isDone).toBe(false);
  expect(endState["todolistId2"][2].isDone).toBe(false);
})

//test for CLEAR-COMPETED-TASKS
test('CLEAR-COMPETED-TASKS: all tasks with isDone should be removed', () => {

  const action = clearCompletedTasks("todolistId2");

  const endState = taskReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(1);
})