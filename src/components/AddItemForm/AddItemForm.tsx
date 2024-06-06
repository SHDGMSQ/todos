import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "./AddItemForm.module.scss";

export const AddItemForm: React.FC<CustomInputProps> = React.memo(({addItem, showButton, ...props}) => {

  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setTitle(e.currentTarget.value);
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addItemHandler();
    }
  }

  const addItemHandler = () => {
    if (!title.trim()) {
      setError("Title is required!")
      setTitle("");
    } else {
      addItem(title);
      setTitle("");
    }
  }

  return (
    <div className={style.addItemComponent}>
      <div className={style.addItemContainer}>
        <input
          {...props}
          className={`${error ? style.showError: ""}`}
          onChange={onChangeInputHandler}
          value={title}
          onKeyPress={onKeyPressHandler}
        />
        <button
          onClick={addItemHandler}
          className={`${showButton ? style.showButton: ""}`}
        ></button>
      </div>
      <p className={`${error ? style.showError: ""}`}>{error}</p>
    </div>
  )
});

//types
type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  addItem: (title: string) => void
  showButton?: boolean
};