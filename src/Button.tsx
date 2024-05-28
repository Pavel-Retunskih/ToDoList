type ButtonPropsType = {
<<<<<<< HEAD
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
=======
  title: string;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ title, onClick, className }: ButtonPropsType) => {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
};
>>>>>>> origin/main
