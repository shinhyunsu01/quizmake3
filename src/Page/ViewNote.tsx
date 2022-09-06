import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Button, { buttonStyle } from "../components/Button";
import Paint from "../components/Paint";
import PrevNext from "../components/PrevNext";
import TopTitle from "../components/TopTitle";
import ViewImage from "../components/ViewImage";
import ViewQuiz from "../components/ViewQuiz";
import WrongQuiz from "../components/WrongQuiz";
import { UserAuth } from "../context/Auth";
import { Spin } from "../lib/icon";
import { cls } from "../utils/cls";
import {
	firebaseGet,
	firebaseImg,
	firebaseImgGet,
	firebaseModify,
	firebaseSave,
} from "../utils/firebaseSave";
import { QuizType } from "../utils/type";
import { unescapeHtml } from "../utils/unescapeHtml";

const ViewNote = () => {
	const { user } = UserAuth();
	const navigate = useNavigate();
	const textRef = useRef<HTMLTextAreaElement>(null);
	const [index, setIndex] = useState(0);
	const [readData, setReadData] = useState<QuizType[]>();
	const [paint, setPaint] = useState(false);

	const [imgarr, setimgArr] = useState<any>([]);
	const [imageURL, setimageURL] = useState<any>();
	const [paintInit, setpaintInit] = useState(false);
	const [click, setClick] = useState(false);

	const [wrongMemo, setWrongMemo] = useState("");

	const [modify, setModify] = useState(false);

	useEffect(() => {
		/*if (
			user === undefined ||
			user === null ||
			(user && !Object.keys(user).includes("displayName"))
		)
			navigate("/signin");
		else */ readQuiz();
	}, []);

	useEffect(() => {
		setWrongMemo("");
	}, [index, setIndex]);
	const readQuiz = async () => {
		console.log(user);
		if (user && !Object.keys(user).includes("displayName")) {
			const read = await firebaseGet({ user: user.displayName });

			if (read && read.Quiz) {
				setReadData(read.Quiz);
			} else {
				//if(readData && readData?.length === 0)
				navigate("/signin");
			}
		}
	};
	const handler = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		if (modify) {
			setClick(true);
			let imgLoading: any;
			if (readData) {
				readData[index].memo = wrongMemo;

				if (imageURL) {
					imgLoading = await firebaseImg({ imageURL });

					if (imgLoading.metadata.fullPath) {
						let filename = imgLoading.metadata.fullPath
							.split("/")[1]
							.split(".")[0];
						if (readData.length - 1 <= index) {
							setIndex(readData.length - 1);
						} else setIndex(index + 1);

						readData[index].imageUrl = filename;
					}
				}

				if (!imageURL || (imageURL && imgLoading.metadata.fullPath)) {
					await firebaseModify({
						user: user.displayName,
						wrongQuiz: readData[index],
						question: readData[index].question,
					});
					setimgArr([]);

					setimageURL("");
					setWrongMemo("");
					setClick(false);
					setPaint(false);
				}
			}
		}

		setModify(!modify);
	};

	useLayoutEffect(() => {
		if (textRef.current !== null && click === false) {
			textRef.current.focus();
		}
	});
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setWrongMemo(e.target.value);
	};

	return (
		<div className="font-bold  flex flex-col justify-center items-center w-full h-[500px]  rounded-md mx-6">
			{paint && readData && readData[index].imageUrl ? (
				<ViewImage data={readData[index].imageUrl} />
			) : (
				""
			)}
			{paint && modify ? (
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

			{readData && readData.length !== 0 ? (
				<>
					<div className="flex items-center flex-col sm:space-x-2">
						<TopTitle title="오답 노트" />

						<ViewQuiz question={unescapeHtml(readData[index].question)} />
					</div>

					<div className="flex ">
						<WrongQuiz
							quiz={readData[index].selectList}
							select={readData[index].answer}
							correctAnswer={readData[index].correct_answer}
						/>

						<textarea
							ref={textRef}
							className="rounded-2xl p-2 w-full mx-2 "
							placeholder={
								readData[index].memo ? readData[index].memo : "메모 해주세요"
							}
							value={wrongMemo}
							onChange={onChange}
							disabled={!modify}
						></textarea>
					</div>

					<div className="flex font-bold">
						<PrevNext setState={setIndex} state={index} data={readData} />
						<button
							id=""
							onClick={() => setPaint(!paint)}
							className={cls(
								"w-16 z-10",
								readData[index].imageUrl ? "bg-green-300" : "bg-slate-300",
								buttonStyle
							)}
						>
							그림
						</button>
						<button
							id=""
							onClick={handler}
							className={cls(
								"w-16 z-10 bg-green-300 flex items-center justify-center",
								buttonStyle
							)}
						>
							{click ? <Spin /> : "수정"}
						</button>
					</div>

					<button
						id=""
						onClick={() => navigate("/")}
						className={cls("w-16 z-10 bg-green-300", buttonStyle)}
					>
						메인
					</button>
				</>
			) : (
				<div className="flex items-center flex-col sm:space-x-2">
					<TopTitle title="오답 기록이 없습니다" />

					<Button
						style=""
						name="Home"
						id=""
						handler={() => navigate("/signin")}
					/>
				</div>
			)}
		</div>
	);
};

export default ViewNote;
