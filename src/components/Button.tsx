import React from "react";
import { useNavigate } from "react-router";
import { cls } from "../utils/cls";

type ButtonType = {
	handler: (e: React.MouseEvent<HTMLElement>) => void;
	name: string;
	style?: string;
	id?: string;
	children?: React.ReactNode;
};

export const buttonStyle =
	"transition-all text-center duration-300 ease-in-out hover:text-white   mx-2  my-2 py-2 font-medium text-black  rounded-md";

const Button = ({ handler, name, style, id, children }: ButtonType) => {
	const navigate = useNavigate();
	const buttonHandler = (e: React.MouseEvent<HTMLElement>) => {
		handler(e);
		if (id === "re") navigate("/quizsolve");
		else if (id === "note") navigate("/note");
	};

	return (
		<button
			id={id}
			onClick={buttonHandler}
			className={cls("w-28 bg-[#00df9a]", buttonStyle, style ? style : "")}
		>
			<div>{name}</div>
			{children}
		</button>
	);
};

export default Button;
