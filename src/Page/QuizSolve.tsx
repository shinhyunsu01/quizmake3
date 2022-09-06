import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import OneQuiz from "../components/OneQuize";
import Timer from "../components/Timer";
import ViewQuiz from "../components/ViewQuiz";

import { Progress } from "../utils/type";

import { QuizContext } from "../context/Quiz";
import { cls } from "../utils/cls";
import { unescapeHtml } from "../utils/unescapeHtml";

const QuizSolve: React.FC = () => {
	const { quizInfo, setQuizInfo } = useContext(QuizContext);

	const [answer, setAnswer] = useState("");
	const [index, setIndex] = useState(0);
	const [resultMessage, setResultMessage] = useState("");
	const navigate = useNavigate();

	const [sec, setSec] = useState(0);
	const [min, setMin] = useState(0);

	const [modalOpen, setmodalOpen] = useState(false);

	const handler = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		const result =
			quizInfo.quizAll[index].correct_answer === answer ? true : false;
		quizInfo.quizAll[index].answer = answer;
		quizInfo.quizAll[index].result = result;

		setmodalOpen(true);
		setResultMessage(result ? "정답 입니다" : "오답 입니다");

		setTimeout(function () {
			setmodalOpen(false);
		}, 1000);

		if (quizInfo.quizAll.length - 1 <= index) {
			setQuizInfo((prev: any) => ({
				...prev,
				endTime: `${min}:${sec}`,
			}));

			navigate("/result");
		} else {
			setIndex(index + 1);

			setAnswer("");
			setQuizInfo(quizInfo);
		}
	};

	return (
		<>
			{Object.keys(quizInfo).length !== 0 ? (
				<div className="relative font-bold flex flex-col items-center w-full h-[500px] border rounded-md mx-6 ">
					<Modal
						style={modalOpen ? "opacity-100 " : "opacity-0 hidden"}
						result={resultMessage}
					/>
					<div className="w-full">
						<div
							className={cls("w-full bg-[#00df9a] h-2", Progress[index])}
						></div>
					</div>

					<div className="flex items-center h-14">
						<Timer
							style="text-center flex justify-center items-center text-xl font-bold space-x-2"
							sec={sec}
							setSec={setSec}
							min={min}
							setMin={setMin}
						/>

						<div className="absolute right-3 bottom-0">
							{answer !== "" ? (
								<button
									onClick={handler}
									className="cursor-pointer text-center right-4 bottom-0 absolute  transition-all duration-300 ease-in-out hover:text-white w-24 mx-auto my-4 py-2 font-medium text-black bg-[#00df9a] rounded-md"
								>
									다음
								</button>
							) : (
								""
							)}
						</div>
					</div>
					<ViewQuiz question={unescapeHtml(quizInfo.quizAll[index].question)} />
					<div>
						<OneQuiz
							quiz={quizInfo.quizAll[index].selectList}
							state={answer}
							handler={setAnswer}
						/>
					</div>
				</div>
			) : (
				<div />
			)}
		</>
	);
};

export default QuizSolve;
