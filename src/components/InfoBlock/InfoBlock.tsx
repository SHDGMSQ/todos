import React, {useCallback} from "react";
import style from "../Todolist/Todolist.module.scss"
import {FilterValuesType} from "../../store/store";

export const InfoBlock: React.FC<InfoBlockPropsType> = React.memo(({status, changeTasks, itemsLeft, clearCompleted}) => {


  const onClickAllHandler = useCallback (() => changeTasks("All"), [changeTasks]);
  const onClickActiveHandler = useCallback (() => changeTasks("Active"), [changeTasks]);
  const onClickCompletedHandler = useCallback (() => changeTasks("Completed"), [changeTasks]);
  const clearCompletedHandler = useCallback (() =>  clearCompleted(), [clearCompleted])

  return (
    <div className={style.infoBlock}>
      <span>{itemsLeft} items left</span>
      <div className={style.filterButtons}>
        <button
          className={`${status === "All" ? style.active: ""}`}
          onClick={onClickAllHandler}
        >All</button>
        <button
          className={`${status === "Active" ? style.active: ""}`}
          onClick={onClickActiveHandler}
        >Active</button>
        <button
          className={`${status === "Completed" ? style.active: ""}`}
          onClick={onClickCompletedHandler}
        >Completed</button>
      </div>
      <button
        className={style.clearCompleted}
        onClick={clearCompletedHandler}
      >Clear completed</button>
    </div>
  );
});

//types
type InfoBlockPropsType = {
  status: FilterValuesType
  changeTasks: (value: FilterValuesType) => void
  itemsLeft: number
  clearCompleted: () => void
}