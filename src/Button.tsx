type ButtonPropsType = {
<<<<<<< HEAD
	title: string
	onClick?:()=> void
	className?: string
}

export const Button = ({title, onClick, className}: ButtonPropsType) => {
	return (
		<button className={className} onClick={onClick}>{title}</button>
	)
=======
  name: string;
  callBack: () => void;
};

export function Button({ name, callBack }: ButtonPropsType) {
  return <button onClick={() => callBack()}>{name}</button>;
>>>>>>> fdb9cc126dd3b310967b2b4ef0f26a31e1e2aaed
}
