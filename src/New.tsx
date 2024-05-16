import { ChangeEvent, useState } from "react";

export function ParentComponent() {
  // Это функция обработчик, которую ParentComponent предоставит дочернему компоненту
  function handleChildClick(childData: string) {
    console.log("Кнопка в дочернем компоненте была нажата!");
    console.log("Данные от дочернего компонента:", childData);
  }

  return <ChildComponent onChildClick={handleChildClick} />;
}

type ChildComponentPropsType = {
  onChildClick: (data: string) => void;
};

function ChildComponent({ onChildClick }: ChildComponentPropsType) {
  const [state, setState] = useState("");
  function onChangeHeandler(e: ChangeEvent<HTMLInputElement>) {
    setState(e.currentTarget.value);
  }
  function handleClick() {
    onChildClick(state);
    setState("");
  }

  return (
    <div>
      <input type="text" value={state} onChange={onChangeHeandler} />
      <button onClick={handleClick}>Нажми на меня</button>
    </div>
  );
}
