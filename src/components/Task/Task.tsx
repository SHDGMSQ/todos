import React, {ChangeEvent, useCallback} from "react";
import style from "./Task.module.scss"
import {TaskType} from "../../store/store";

export const Task: React.FC<TaskPropsType> = React.memo(({todoId, task, removeTask, changeTaskStatus}) => {

  const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked;
    changeTaskStatus(todoId, task.id, status);
  }, [changeTaskStatus, task.id]);

  const removeTaskHandler = useCallback(() => {
    removeTask(todoId, task.id);
  }, [removeTask, task.id]);


  return (
    <div className={style.taskContainer}>
      <div className={style.taskInner}>
        <input
          onChange={changeTaskStatusHandler}
          type="checkbox"
          checked={task.isDone}
        />
        <p className={`${task.isDone ? style.done: ""}`}>{task.title}</p>
        <button
          className={style.removeTask}
          onClick={removeTaskHandler}
        ></button>
      </div>
    </div>
  )
});

//types
type TaskPropsType = {
  todoId: string
  task: TaskType
  removeTask: (todoId: string, taskId: string) => void
  changeTaskStatus: (todoId: string, taskId: string, status: boolean) => void
}
