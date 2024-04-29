type ButtonPropsType = {
  disabled?: boolean;
  name: string;
  callBack: () => void;
};

export function Button({ name, callBack, disabled }: ButtonPropsType) {
  return (
    <button onClick={() => callBack()} disabled={disabled}>
      {name}
    </button>
  );
}
