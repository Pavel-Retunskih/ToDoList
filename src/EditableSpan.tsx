import { ChangeEvent, useState } from "react";

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
  };

  return (
    <>
      {editMode ? (
        <input
          type="text"
          autoFocus
          value={newTitle}
          onChange={(e) => {
            onInputChangeValueHandler(e);
          }}
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
