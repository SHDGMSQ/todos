import React, {useState} from "react";
import style from "./App.module.scss";
import {Todolist} from "./components/Todolist/Todolist";
import {Input} from "./components/Input/Input";

const initialState: Array<TodolistType> = [
  {
    id: "1",
    title: "First TODO",
    tasks: [
      {
        id: "1",
        status: "Active",
        title: "First task",
      },
      {
        id: "2",
        status: "Active",
        title: "Sec task",
      },
    ]
  },
];

export const App = () => {

  const [state, setState] = useState<any>(initialState);

  const changeTodoHandler = (value: string) => {
  };


  return (
    <div className={style.app}>
      <div className={style.container}>
        <h1>Todos</h1>
        <Input
          className={style.input}
          type="text"
          placeholder="Add todos..."
          onChangeHandler={changeTodoHandler}
        />
        {state.map((todolist: TodolistType) => <Todolist
          key={todolist.id}
          tasks={todolist.tasks}
          title={todolist.title}
        />)}
      </div>
    </div>
  );
};

//types
export type TodolistType = {
  id: string,
  title: string
  tasks: Array<TaskType>
}

export type TaskType = {
  id: string,
  title: string,
  status: "All" | "Active" | "Completed"
}