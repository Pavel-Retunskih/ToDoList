import { ChangeEvent, useState } from "react";
import { Button } from "./Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

type AddItemFormPropsType = {
  addItem: (itemTitle: string) => void;
};

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
    <div style={{ width: "100%", marginTop: "20px", marginLeft: "40px" }}>
      <TextField
        autoFocus
        size="small"
        type="text"
        value={title}
        placeholder={error ? error : "New Title here"}
        onChange={onChangeInputHeandler}
      />
      <IconButton
        disabled={titleIsEmpty || titleIsToLong}
        size="medium"
        onClick={() => {
          onClickHandler(title);
        }}
      >
        <AddIcon color="primary" />
      </IconButton>
    </div>
  );
}
