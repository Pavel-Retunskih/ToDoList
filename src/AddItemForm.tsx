import { ChangeEvent, useState } from "react";
import s from "./AddItemForm.module.css";

type AddItemFormPropstype = {
  onChange: (itemTitle: string) => void;
};

export function AddItemForm({ onChange }: AddItemFormPropstype) {
  const [state, setState] = useState<string>("");
  const [error, setError] = useState("");

  const isEmptyTitle = state.length <= 0;
  const isTitleToLong = state.length >= 20;

  const onChangeHeandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 0) {
      setError("");
    }
    setState(e.currentTarget.value);
  };

  const onClickHeandler = (state: string) => {
    if (!isEmptyTitle && !isTitleToLong) {
      onChange(state);
      setState("");
      setError("");
    } else if (isEmptyTitle) {
      setError("Title is empty");
      setState("");
    } else if (isTitleToLong) {
      setError("Title is to long, max 20 characters ");
      setState("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={state}
        onChange={onChangeHeandler}
        autoFocus
        placeholder={error}
        className={error ? s.error : ""}
      />
      <button
        onClick={() => onClickHeandler(state)}
        disabled={error ? true : false}
      >
        +
      </button>
    </div>
  );
}
