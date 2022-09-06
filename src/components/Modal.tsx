import React from "react";
import { cls } from "../utils/cls";

type modalType = {
	style: string;
	result: string;
};

const Modal = ({ style, result }: modalType) => {
	return (
		<div
			className={cls(
				"absolute  top-1/4 bg-white border w-60 h-40 text-center",
				style
			)}
		>
			<div className="relative p-4 w-full h-full flex items-center justify-center ">
				<div>{result}</div>
			</div>
		</div>
	);
};

export default Modal;
