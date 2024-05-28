import { ChangeEvent, useState } from "react";

type EditebleSpanPropsType = {
  title: string;
  onChange: (title: string) => void;
};
export function EditebleSpan({ title, onChange }: EditebleSpanPropsType) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [state, setState] = useState(title);

  const onChangeHeandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.currentTarget.value);
  };
  const onBlurHeandler = (newTitle: string) => {
    setEditMode(false);
    onChange(newTitle);
  };
  return editMode ? (
    <input
      type="text"
      value={state}
      autoFocus
      onBlur={() => onBlurHeandler(state)}
      onChange={onChangeHeandler}
    />
  ) : (
    <span onDoubleClick={() => setEditMode(true)}>{title}</span>
  );
}
