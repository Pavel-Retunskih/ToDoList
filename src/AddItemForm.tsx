import { ChangeEvent, useState } from "react";
import { Button } from "./Button";

type AddItemFormPropsType = {
  addItem: (itemTitle: string) => void;
};
console.log("AddItemForm");

export function AddItemForm({ addItem }: AddItemFormPropsType) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const titleIsEmpty = title.trim().length === 0;
  const titleIsToLong = title.trim().length > 20;

  const onChangeInputHeandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim().length === 0) {
      setError("Title is empty");
    }
    setTitle(event.currentTarget.value);
  };

  const onClickHandler = (itemTitle: string) => {
    if (!titleIsEmpty && !titleIsToLong) {
      addItem(itemTitle);
      setTitle("");
      setError("");
    } else {
      setError("Поле не должно быть пустым");
    }
  };
  return (
    <div>
      <input
        autoFocus
        type="text"
        value={title}
        placeholder={error ? error : "New Title here"}
        onChange={onChangeInputHeandler}
      />
      <Button
        disabled={titleIsEmpty || titleIsToLong}
        name="+"
        callBack={() => {
          onClickHandler(title);
        }}
      />
    </div>
  );
}
