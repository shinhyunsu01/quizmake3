import React, { useEffect, memo } from "react";
import { cls } from "../utils/cls";
import { unescapeHtml } from "../utils/unescapeHtml";

type OneQuizType = {
	quiz: string[];
	select: string;
	correctAnswer: string;
};
/*
font-size: 0.75rem // 12
line-height: 1rem // 16

*/

const WrongQuiz = ({ quiz, select, correctAnswer }: OneQuizType) => {
	return (
		<div className="flex flex-col w-full mx-2">
			{quiz.map((selectAnswer: string, index: number) => (
				<div
					key={index}
					className={cls(
						`  border text-[10px] sm:text-sm  outline-none  px-4 py-2 rounded-2xl text-center my-2`,
						select === selectAnswer
							? "bg-red-300"
							: correctAnswer === selectAnswer
							? "bg-green-300"
							: ""
					)}
				>
					{select === selectAnswer
						? "선택 : "
						: correctAnswer === selectAnswer
						? "정답 : "
						: ""}

					<span>{unescapeHtml(selectAnswer)}</span>
				</div>
			))}
		</div>
	);
};

export default memo(WrongQuiz);
