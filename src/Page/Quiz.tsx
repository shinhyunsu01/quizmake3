import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import { UserAuth } from "../context/Auth";
import { QuizContext } from "../context/Quiz";
import { Spin } from "../lib/icon";
import { requst } from "../utils/api";
import { cls } from "../utils/cls";

import { Title, Difficult } from "../utils/type";

const Quiz = () => {
	const [next, setNext] = useState(0);
	const [click, setClick] = useState(false);
	const { setQuizInfo } = useContext(QuizContext);
	const navigate = useNavigate();

	const [select, setSelect] = useState({
		categorySelect: 0,
		difficultSelect: 0,
	});

	let data = next === 0 ? Title : Difficult;
	let title = next === 0 ? "카테 고리" : "난이도";
	const handler = async () => {
		setClick(true);
		setNext((prev) => prev + 1);

		const quizData = await requst(
			select.categorySelect !== 0
				? select.categorySelect + 9
				: select.categorySelect,
			Difficult[select.difficultSelect].toLowerCase()
		);

		setQuizInfo({ quizAll: quizData });
		if (next >= 1) {
			navigate("/quizsolve");
		}
		setClick(false);
	};

	const setHandler = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		const value = +(e.target as HTMLButtonElement).value;

		setSelect({
			categorySelect: next === 0 ? value : select.categorySelect,
			difficultSelect: next === 1 ? value : select.difficultSelect,
		});
	};

	return (
		<div className="relative font-bold  flex flex-col items-center w-full h-[500px] border rounded-md mx-6 ">
			<div className="absolute mt-6 font-bold  text-2xl text-center underline underline-offset-4 decoration-[#00df9a]">
				{title}
			</div>

			<ul className=" px-4 mt-20 mb-2 overflow-scroll ">
				{data.map((item: string, index: number) => (
					<li key={index}>
						<button
							onClick={setHandler}
							value={index}
							className={cls(
								"  border-slate-100 border-b-2  appearance-none w-60 cursor-pointer p-2 mx-4 font-bold ",
								(index === select.categorySelect && next === 0) ||
									(index === select.difficultSelect && next === 1)
									? "bg-[#00df9a] hover:bg-[#00df9a]"
									: "hover:bg-slate-100"
							)}
						>
							{item}
						</button>
					</li>
				))}
			</ul>

			<div className="ml-auto mt-auto ">
				<Button
					handler={handler}
					name={click && next === 2 ? "" : next === 1 ? "퀴즈 풀기" : "다음"}
					style="text-center flex-end "
					id=""
				>
					{click && next === 2 ? (
						<div className="flex items-center justify-center">
							<Spin />
						</div>
					) : (
						""
					)}
				</Button>
			</div>
		</div>
	);
};

export default Quiz;
