import React, {useCallback, useEffect} from "react";
import {Task} from "../Task/Task";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import style from "./Todolist.module.scss";
import {InfoBlock} from "../InfoBlock/InfoBlock";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {
  addTaskTC,
  changeTaskStatusTC,
  clearCompletedTasksTC,
  getTasksTC,
  removeTaskTC
} from "../../store/reducers/task-reducer";
import {FilterValuesType, TaskType, TodoListType} from "../../store/store";

export const Todolist: React.FC<TodolistPropsType> = React.memo(({todolist, removeTodolist, changeTodoFilter}) => {

  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks[todolist.id]);

  useEffect(() => {
    dispatch(getTasksTC(todolist.id))
  }, [])

  const removeTodolistHandler = useCallback(() => {
    removeTodolist(todolist.id);
  }, [removeTodolist, todolist.id]);

  const addTask = (title: string) => {
    dispatch(addTaskTC(todolist.id, title));
  };

  const removeTask = useCallback((id: string, taskId: string) => {
    dispatch(removeTaskTC(id, taskId));
  }, []);

  const changeTaskStatus = useCallback((todoId: string, taskId: string, status: boolean) => {
    dispatch(changeTaskStatusTC(todoId, taskId, status));
  }, []);

  const changeTodoFilterHandler = useCallback((value: FilterValuesType) => {
    changeTodoFilter(todolist.id, value)
  }, [changeTodoFilter, todolist.id]);

  const clearCompletedTasks = useCallback(() => {
    dispatch(clearCompletedTasksTC(todolist.id));
  }, [todolist.id]);

  let filteredTasks = tasks;
  if (todolist.status === "Active") {
    filteredTasks = filteredTasks?.filter((task: TaskType) => !task.isDone);
  }
  if (todolist.status === "Completed") {
    filteredTasks = filteredTasks?.filter((task: TaskType) => task.isDone);
  }

  const itemsLeft = tasks?.filter((task: TaskType) => !task.isDone).length;

  return (
    <div className={style.todoContainer}>
      <div className={style.todosTitle}>
        <h3>{todolist.title}</h3>
        <button onClick={removeTodolistHandler}></button>
      </div>
      <AddItemForm
        placeholder="Add task..."
        addItem={addTask}
      />
      {filteredTasks?.map((task: TaskType) => <Task
        key={task.id}
        todoId={todolist.id}
        task={task}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
      />)}
      <InfoBlock
        status={todolist.status}
        changeTasks={changeTodoFilterHandler}
        itemsLeft={itemsLeft}
        clearCompleted={clearCompletedTasks}
      />
    </div>
  )
}) ;

//types
type TodolistPropsType = {
  todolist: TodoListType
  removeTodolist: (id: string) => void
  changeTodoFilter: (id: string, value: FilterValuesType) => void
}
