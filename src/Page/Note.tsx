import React, { useContext, useEffect, useState } from "react";
import OneQuize from "../components/OneQuize";
import WrongQuiz from "../components/WrongQuiz";
import { QuizContext } from "../context/Quiz";
import { unescapeHtml } from "../utils/unescapeHtml";

import { UserAuth } from "../context/Auth";
import { useNavigate } from "react-router";
import { Spin } from "../lib/icon";
import { QuizType } from "../utils/type";
import TopTitle from "../components/TopTitle";
import ViewQuiz from "../components/ViewQuiz";
import { firebaseImg, firebaseSave } from "../utils/firebaseSave";
import Button, { buttonStyle } from "../components/Button";
import Paint from "../components/Paint";
import { cls } from "../utils/cls";
import PrevNext from "../components/PrevNext";
import { ref, uploadBytes } from "@firebase/storage";
import { storage } from "../firebase/setup";

const Note = () => {
	const { user } = UserAuth();
	const { quizInfo, setQuizInfo } = useContext(QuizContext);
	const [wrongQuizAll, setwrongQuizAll] = useState<QuizType[]>();

	const [wrongMemo, setWrongMemo] = useState("");
	const [index, setIndex] = useState(0);
	const [paint, setPaint] = useState(false);
	const [paintInit, setpaintInit] = useState(false);

	const [imgarr, setimgArr] = useState<any>([]);
	const [imageURL, setimageURL] = useState<any>();

	const [click, setClick] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		let wrongQuizAll: QuizType[] = [];

		if (Object.keys(quizInfo).length === 0) {
			navigate("/signin");
		} else {
			quizInfo.quizAll.map((quiz: QuizType) => {
				if (quiz.result === false) {
					wrongQuizAll.push(quiz);
				}
			});

			setwrongQuizAll(wrongQuizAll);
		}
	}, []);

	const handler = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		setClick(true);
		let imgLoading: any;
		if (wrongQuizAll) {
			wrongQuizAll[index].memo = wrongMemo;

			if (imageURL) {
				imgLoading = await firebaseImg({ imageURL });

				if (imgLoading.metadata.fullPath) {
					let filename = imgLoading.metadata.fullPath
						.split("/")[1]
						.split(".")[0];
					if (wrongQuizAll.length - 1 <= index) {
						setIndex(wrongQuizAll.length - 1);
					} else setIndex(index + 1);

					wrongQuizAll[index].imageUrl = filename;
				}
			}

			if (!imageURL || (imageURL && imgLoading.metadata.fullPath)) {
				if (wrongQuizAll.length - 1 <= index) {
					setIndex(wrongQuizAll.length - 1);
				} else setIndex(index + 1);

				await firebaseSave({
					user: user.displayName,
					wrongQuiz: wrongQuizAll[index],
				});
				setimgArr([]);

				setimageURL("");
				setWrongMemo("");
				setClick(false);
				setPaint(false);
			}
		}
	};

	const paintHandler = () => {
		setPaint(!paint);
		setpaintInit(true);
	};

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setWrongMemo(e.target.value);
	};

	return (
		<>
			{wrongQuizAll ? (
				<div className="font-bold  flex flex-col justify-center items-center w-full h-[500px] border rounded-md mx-6">
					{paint ? (
						<Paint
							handler={setimgArr}
							imgdata={imgarr}
							openFlag={paintInit}
							openFlagHandler={setpaintInit}
							setimageURL={setimageURL}
						/>
					) : (
						""
					)}
					<div className="flex items-center flex-col sm:space-x-2">
						<TopTitle title="오답 노트" />

						<ViewQuiz
							question={
								wrongQuizAll[index]
									? unescapeHtml(wrongQuizAll[index].question)
									: ""
							}
						/>
					</div>

					<div className="flex space-x-4 ">
						<WrongQuiz
							quiz={wrongQuizAll[index] ? wrongQuizAll[index].selectList : [""]}
							select={wrongQuizAll[index] ? wrongQuizAll[index].answer : ""}
							correctAnswer={
								wrongQuizAll[index] ? wrongQuizAll[index].correct_answer : ""
							}
						/>

						<textarea
							className="rounded-2xl p-2 w-full"
							placeholder={
								wrongQuizAll[index].memo
									? wrongQuizAll[index].memo
									: "메모 해주세요"
							}
							value={wrongMemo}
							onChange={onChange}
						></textarea>
					</div>

					<div className="flex justify-center font-bold z-10">
						<PrevNext setState={setIndex} state={index} data={wrongQuizAll} />

						<button
							id="paint"
							onClick={paintHandler}
							className={cls("bg-green-300", "w-20", buttonStyle)}
						>
							그림 메모
						</button>

						<button
							id="save"
							onClick={handler}
							className={cls(
								"bg-green-300 w-16 flex justify-center text-center items-center",
								buttonStyle
							)}
						>
							{click ? <Spin /> : "저장"}
						</button>
					</div>
					<button
						id=""
						onClick={() => navigate("/")}
						className={cls("w-20 bg-green-300", buttonStyle)}
					>
						메인
					</button>
				</div>
			) : (
				<div />
			)}
		</>
	);
};

export default Note;
