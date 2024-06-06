import {api} from "../../api/api";
import {AppThunk, FilterValuesType, TodoListType} from "../store";

const initialState: TodoListType[] = [];

export const todosReducer = (state: TodoListType[] = initialState, action: TodosActionsType): TodoListType[] => {
  switch (action.type) {
    case "TODOS/GET-TODOS":
      return action.todolists;

    case "TODOS/ADD-TODOLIST":
      return [action.todolist, ...state];

    case "TODOS/REMOVE-TODOLIST":
      return state.filter((todolist) => todolist.id !== action.todoId);

    case "TODOS/CHANGE-TODO-FILTER":
      return state.map((todolist) => todolist.id === action.todoId ? {...todolist, status: action.value}: todolist);

    default:
      return state;
  }
};

//actions
export const getTodos = (todolists: TodoListType[]) => ({type: "TODOS/GET-TODOS", todolists} as const);
export const addTodolist = (todolist: TodoListType) => ({type: "TODOS/ADD-TODOLIST", todolist} as const);
export const removeTodolist = (todoId: string) => ({type: "TODOS/REMOVE-TODOLIST", todoId} as const);
export const changeTodoFilter = (todoId: string, value: FilterValuesType) => ({type: "TODOS/CHANGE-TODO-FILTER", todoId, value} as const);

//thunks
export const getTodosTC = (): AppThunk => (dispatch) => {
  const todolists = api.getTodos();
  dispatch(getTodos(todolists));
};
export const addTodosTC = (title: string): AppThunk => ((dispatch) => {
  const todolist: TodoListType = api.addTodolist(title);
  dispatch(addTodolist(todolist));
});
export const removeTodolistTC = (todoId: string): AppThunk => (dispatch) => {
  api.removeTodoList(todoId);
  dispatch(removeTodolist(todoId));
};
export const changeTodoFilterTC = (todoId: string, value: FilterValuesType): AppThunk => (dispatch) => {
  api.changeTodoFilter(todoId, value);
  dispatch(changeTodoFilter(todoId, value));
};

//types
export type addTodolistType = ReturnType<typeof addTodolist>
export type removeTodolistType = ReturnType<typeof removeTodolist>

export type TodosActionsType =
  | ReturnType<typeof getTodos>
  | addTodolistType
  | removeTodolistType
  | ReturnType<typeof changeTodoFilter>