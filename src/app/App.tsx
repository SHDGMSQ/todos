import React, {useEffect} from "react";
import style from "./App.module.scss";
import {Todolist} from "../components/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {addTodosTC, changeTodoFilterTC, getTodosTC, removeTodolistTC} from "../store/reducers/todos-reducer";
import {FilterValuesType, TodoListType} from "../store/store";

export const App = () => {

  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodosTC());
  }, []);

  const addTodolist = (title: string) => {
    dispatch(addTodosTC(title));
  };

  const removeTodolist = (todoId: string) => {
    dispatch(removeTodolistTC(todoId));
  };

  const changeTodoFilter = (todoId: string, value: FilterValuesType) => {
    dispatch(changeTodoFilterTC(todoId, value))
  };

  return (
    <div className={style.app}>
      <div className={style.container}>
        <h1>Todos</h1>
        <div className={style.header}>
          <AddItemForm
            placeholder="Add todos..."
            addItem={addTodolist}
            showButton
          />
        </div>

        <div className={style.todosContainer}>
          {todos.map((todolist: TodoListType) => <Todolist
            key={todolist.id}
            todolist={todolist}
            removeTodolist={removeTodolist}
            changeTodoFilter={changeTodoFilter}
          />)}
        </div>
      </div>
    </div>
  );
};