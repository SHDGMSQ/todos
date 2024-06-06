import {TaskType, TodoListType} from "../store/store";

const KEY_TODOLISTS = "KEY_TODOLISTS";
const KEY_TASKS = "KEY_TASKS";

// inner functions
const saveTodos = (todolists: TodoListType[]) => {
  window.localStorage.setItem(KEY_TODOLISTS, JSON.stringify(todolists));
}
const saveTasks = (tasks: { [key: string]: TaskType[] }) => {
  window.localStorage.setItem(KEY_TASKS, JSON.stringify(tasks));
}

export const api = {
  getTodos() {
    const todos = window.localStorage.getItem(KEY_TODOLISTS);
    return todos ? JSON.parse(todos) : [];
  },
  getTasks() {
    const tasks = window.localStorage.getItem(KEY_TASKS);
    return tasks ? JSON.parse(tasks) : [];
  },
  addTodolist(title: string) {
    const todos = this.getTodos();
    const tasks = this.getTasks();
    const id = Date.now().toString();
    const newTodolist: TodoListType = {
      id,
      title,
      status: "All"
    };
    saveTodos([newTodolist, ...todos]);
    saveTasks({...tasks, [id]: []});
    return newTodolist;
  },
  removeTodoList(id: string) {
    const todos = this.getTodos();
    const tasks = this.getTasks();
    const filteredTodoLists = todos.filter((todolist: TodoListType) => todolist.id !== id);
    delete tasks[id];
    saveTodos(filteredTodoLists);
    saveTasks(tasks);
  },
  addTask(todoId: string, title: string) {
    const tasks = this.getTasks();
    const newTask: TaskType = {
      id: Date.now().toString(),
      title,
      isDone: false
    }
    saveTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
    return newTask;
  },
  removeTask(todoId: string, taskId: string) {
    const tasks = this.getTasks();
    saveTasks({...tasks, [todoId]: tasks[todoId].filter((task: TaskType) => task.id !== taskId )})
  },
  changeTaskStatus(todoId: string, taskId: string, status: boolean) {
    const tasks = this.getTasks();
    saveTasks({...tasks, [todoId]: tasks[todoId].map((task: TaskType) => task.id === taskId ? {...task, isDone: status}: task)})
  },
  changeTodoFilter(todoId: string, value: string) {
    const todoLists = this.getTodos();
    const updatedTodolists = todoLists.map((todoList: TodoListType) => todoList.id === todoId ? {
      ...todoList,
      status: value,
    }: todoList);
    saveTodos(updatedTodolists);
  },
  clearCompletedTasks(todoId: string) {
    const tasks = this.getTasks();
    saveTasks({...tasks, [todoId]: tasks[todoId].filter((task: TaskType) => !task.isDone)});
  }
};