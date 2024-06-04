import React from "react";
import {Input} from "../components/Input/Input";
import style from "../App.module.scss"

export const Task = (props: any) => {

  const changeTaskStatus = () => {}


  return (
    <div className={style.taskContainer}>

      <div className={style.taskInner}>
        <Input onChangeHandler={changeTaskStatus} type="checkbox"/>
        <p>{props.title}</p>
      </div>
    </div>
  )
}

//types
