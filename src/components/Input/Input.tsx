import React, {ChangeEvent} from "react";

export const Input: React.FC<CustomInputProps> = ({onChangeHandler, ...props}) => {

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(e.currentTarget.value)
  }

  return (
    <input {...props} onChange={changeInputHandler}/>
  )
}

//types
type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onChangeHandler: (value: string) => void
};