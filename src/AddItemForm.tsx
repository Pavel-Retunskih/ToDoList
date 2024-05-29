import { ChangeEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
  addItem: (itemTitle: string) => void;
};

export function AddItemForm({ addItem }: AddItemFormPropsType) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const titleIsEmpty = title.trim().length === 0;
  const titleIsToLong = title.trim().length > 20;

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
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
      <TextField
        id="outlined-basic"
        label="New Title here"
        variant="outlined"
        autoFocus
        type="text"
        value={title}
        placeholder={error ? error : "New Title here"}
        onChange={onChangeInputHandler}
        size="small"
      />

      <IconButton
        aria-label=""
        disabled={titleIsEmpty || titleIsToLong}
        onClick={() => {
          onClickHandler(title);
        }}
      >
        <PostAddIcon />
      </IconButton>
    </div>
  );
}
