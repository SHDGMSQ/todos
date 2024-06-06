import {api} from "../../api/api";
import {AppThunk, TaskType} from "../store";
import {addTodolistType, removeTodolistType} from "./todos-reducer";

const initialState: TaskStateType = {};

export const taskReducer = (state: TaskStateType = initialState, action: TasksActionsType): TaskStateType => {
  switch (action.type) {
    case "TODOS/ADD-TODOLIST":
      return {...state, [action.todolist.id]: []};

    case "TODOS/REMOVE-TODOLIST":
      const copy = {...state};
      delete copy[action.todoId];
      return copy;

    case "TASKS/SET-TASKS":
      return {...state, [action.todoId]: state[action.todoId] = action.tasks};

    case "TASKS/REMOVE-TASK":
      return {...state, [action.todoId]: state[action.todoId].filter(f => f.id !== action.taskId)};

    case "TASKS/ADD-TASK":
      return {...state, [action.todoId]: [action.task, ...state[action.todoId]]};

    case "TASKS/CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todoId]: state[action.todoId].map((task) => task.id === action.taskId ? {
          ...task,
          isDone: action.status
        } : task)
      };

    case "TASKS/CLEAR-COMPETED-TASKS":
      return {
        ...state,
        [action.todoId]: state[action.todoId].filter((task) => !task.isDone)
      };

    default:
      return state;
  }
};

//actions
export const setTasks = (todoId: string, tasks: TaskType[]) => ({type: "TASKS/SET-TASKS", todoId, tasks} as const);
export const removeTask = (todoId: string, taskId: string) => ({type: "TASKS/REMOVE-TASK", todoId, taskId} as const);
export const addTask = (todoId: string, task: TaskType) => ({type: "TASKS/ADD-TASK", todoId, task} as const);
export const changeTaskStatus = (todoId: string, taskId: string, status: boolean) => ({
  type: "TASKS/CHANGE-TASK-STATUS",
  todoId,
  taskId,
  status
} as const);
export const clearCompletedTasks = (todoId: string) => ({type: "TASKS/CLEAR-COMPETED-TASKS", todoId} as const);

//thunks
export const getTasksTC = (todoId: string): AppThunk => (dispatch) => {
  const tasks = api.getTasks()[todoId];
  dispatch(setTasks(todoId, tasks));
};
export const removeTaskTC = (todoId: string, taskId: string): AppThunk => (dispatch) => {
  api.removeTask(todoId, taskId);
  dispatch(removeTask(todoId, taskId));
};
export const addTaskTC = (todoId: string, title: string): AppThunk => (dispatch) => {
  const task = api.addTask(todoId, title);
  dispatch(addTask(todoId, task));
};
export const changeTaskStatusTC = (todoId: string, taskId: string, status: boolean): AppThunk => (dispatch) => {
  api.changeTaskStatus(todoId, taskId, status);
  dispatch(changeTaskStatus(todoId, taskId, status));
};
export const clearCompletedTasksTC = (todoId: string): AppThunk => (dispatch) => {
  api.clearCompletedTasks(todoId);
  dispatch(clearCompletedTasks(todoId));
};


type TaskStateType = { [key: string]: TaskType[] };
export type TasksActionsType =
  | ReturnType<typeof removeTask>
  | addTodolistType
  | removeTodolistType
  | ReturnType<typeof setTasks>
  | ReturnType<typeof addTask>
  | ReturnType<typeof changeTaskStatus>
  | ReturnType<typeof clearCompletedTasks>

