import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import { QuizContext } from "../context/Quiz";

const Result: React.FC = () => {
	const { quizInfo, setQuizInfo } = useContext(QuizContext);
	const chart = useRef<any>(null);
	const [score, setScore] = useState(0);
	const navigate = useNavigate();

	const handler = (e: React.MouseEvent<HTMLElement>) => {
		if ((e.target as HTMLButtonElement).id === "re") {
			const reData = quizInfo.quizAll.map((quiz: any) => {
				quiz.result = null;
				quiz.answer = null;

				return quiz;
			});
			setQuizInfo({ quizAll: reData });
			navigate("/quizsolve");
		} else {
			navigate("/note");
		}
	};

	useEffect(() => {
		let scoreAdd = 0;
		let count = 0;

		if (Object.keys(quizInfo).length !== 0) {
			quizInfo.quizAll.map((quiz: any) => {
				if (quiz.result === true) {
					scoreAdd++;
				}
			});
			setScore(scoreAdd);
		} else {
			navigate("/signin");
		}

		let interval = setInterval(() => {
			if (count <= scoreAdd * 10) {
				count++;
				chart.current.style.background = `conic-gradient(#f5b914 0% ${count}%, #dedede ${count}% 100%)`;
			} else {
				clearInterval(interval);
			}
		}, 10);
	});

	return (
		<>
			{Object.keys(quizInfo).length !== 0 ? (
				<div className="font-bold  flex flex-col justify-center items-center w-full h-[500px] border rounded-md mx-6">
					<div className="flex space-x-2 text-4xl">
						<div className="mb-2">총 소요 시간 </div>
						<div>{quizInfo?.endTime}</div>
					</div>
					<div className="relative flex gap-4 mb-4">
						<div
							className="relative w-40 h-40  rounded-full doughnut1"
							ref={chart}
						>
							<span className="items-center justify-center flex  bg-white  absolute top-1/2 left-1/2 w-20 h-20 rounded-full text-center text-sm -translate-y-2/4 -translate-x-2/4">
								<div className="">정답 : {score * 10}%</div>
							</span>
						</div>
					</div>

					<div>
						<div className="">
							맞힌 문제){" "}
							<span
								className=" text-green-400 text-2xl"
								data-testid={"correct"}
							>
								{score}
							</span>
						</div>
						<div className="">
							틀린 문제){" "}
							<span className=" text-red-400 text-2xl">{10 - score}</span>
						</div>
					</div>

					<div className="flex space-x-2 pt-4">
						<Button handler={handler} name="다시" style="" id="re" />

						<Button handler={handler} name="오답 노트" style="" id="note" />
					</div>
				</div>
			) : (
				<div />
			)}
		</>
	);
};

export default Result;
