import React from "react";
import { cls } from "../utils/cls";
import { QuizType } from "../utils/type";
import { buttonStyle } from "./Button";

type PrevNextType = {
	setState: any;
	state: number;
	data: QuizType[];
};

const PrevNext = ({ setState, state, data }: PrevNextType) => {
	const handler = (e: React.MouseEvent<HTMLElement>) => {
		const idCheck = (e.target as HTMLButtonElement).id;

		if (data) {
			if (idCheck === "prev") {
				if (state <= 0) {
					setState(0);
				} else setState(state - 1);
			} else {
				if (data.length - 1 <= state) {
					setState(data.length - 1);
				} else setState(state + 1);
			}
		}
	};
	return (
		<>
			<button
				id="prev"
				className={cls("z-10 bg-[#00df9a]", "w-12", buttonStyle)}
				onClick={handler}
			>
				이전
			</button>

			<button
				id="next"
				className={cls("z-10 bg-[#00df9a]", "w-12", buttonStyle)}
				onClick={handler}
			>
				다음
			</button>
		</>
	);
};

export default PrevNext;
