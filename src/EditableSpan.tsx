import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
  oldTitle: string;
  setItem: (newTitle: string) => void;
};

export function EditableSpan({ oldTitle, setItem }: EditableSpanPropsType) {
  const [newTitle, setNewTitle] = useState<string>(oldTitle);
  const [editMode, setEditMode] = useState<boolean>(false);

  const onSetEditModeHandler = () => {
    setEditMode(!editMode);
  };

  const onInputChangeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
  };

  const onSaveHandler = () => {
    if (editMode) {
      setItem(newTitle);
      setEditMode(false);
    }
    console.log(newTitle);
  };

  return (
    <>
      {editMode ? (
        <TextField
          id="standard-basic"
          label="New Title"
          size="small"
          variant="standard"
          type="text"
          autoFocus
          value={newTitle}
          onChange={onInputChangeValueHandler}
          onBlur={() => {
            onSaveHandler();
          }}
        />
      ) : (
        <span onDoubleClick={onSetEditModeHandler}>{oldTitle}</span>
      )}
    </>
  );
}
