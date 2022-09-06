import React, { memo } from "react";
import { cls } from "../utils/cls";
import { unescapeHtml } from "../utils/unescapeHtml";

type OneQuizType = {
	quiz: any;
	state: string;
	handler: React.Dispatch<React.SetStateAction<string>>;
};

const OneQuiz = ({ quiz, state, handler }: OneQuizType) => {
	const selectHandler = (e: React.MouseEvent<HTMLElement>) => {
		const value = (e.target as HTMLButtonElement).value;
		handler(value);
	};

	return (
		<div className="flex flex-col">
			{quiz.map((selectAnswer: string, index: number) => (
				<button
					key={index}
					value={selectAnswer}
					onClick={selectHandler}
					className={cls(
						`cursor-pointer font-bold border outline-none  border-gray-300 px-6 py-2 rounded-md text-center my-2`,
						state === selectAnswer
							? "bg-[#00df9a] hover-[#00df9a]"
							: "hover:bg-gray-50"
					)}
				>
					{unescapeHtml(selectAnswer)}
				</button>
			))}
		</div>
	);
};

export default memo(OneQuiz);
