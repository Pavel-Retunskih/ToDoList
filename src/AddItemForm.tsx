import { ChangeEvent, useState } from "react";
import { Button } from "./Button";

type AddItemFormPropsType = {
  addItem: (itemTitle: string) => void;
};

export function AddItemForm({ addItem }: AddItemFormPropsType) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const titleIsEmpty = title.trim().length === 0;
  const titleIsToLong = title.trim().length > 20;
  const onChangeInputHeandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setError("");
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
      <input type="text" value={title} onChange={onChangeInputHeandler} />
      {error ? <div>{error}</div> : ""}
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
