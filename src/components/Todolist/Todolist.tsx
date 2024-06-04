import React from "react";
import {Task} from "../../Task/Task";
import {TaskType} from "../../App";
import {Input} from "../Input/Input";

// @ts-ignore
export const Todolist = ({title, tasks}) => {
  const addTaskHandler = () => {}
  return (
    <div>
      <h2>{title}</h2>
      <Input onChangeHandler={addTaskHandler} type="text" placeholder="Add task..." />
      {tasks.map((task: TaskType) => <Task
        key={task.id}
        title={task.title}
        status={task.status}
      />)}
    </div>
  )
};


//types
type TodolistPropsType = {

}
