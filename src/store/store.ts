import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer, TasksActionsType} from "./reducers/task-reducer";
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";
import {TodosActionsType, todosReducer} from "./reducers/todos-reducer";

const rootReducer = combineReducers({
  tasks: taskReducer,
  todos: todosReducer,
})

export const store = createStore(rootReducer, undefined, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppActionsType = TasksActionsType | TodosActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export type FilterValuesType = "All" | "Active" | "Completed";
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type TodoListType = {
  id: string;
  title: string;
  status: FilterValuesType;
};

//@ts-ignore
window.store = store;