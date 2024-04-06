type ButtonPropsType = {
  name: string;
  callBack: () => void;
};

export function Button({ name, callBack }: ButtonPropsType) {
  return <button onClick={() => callBack()}>{name}</button>;
}
