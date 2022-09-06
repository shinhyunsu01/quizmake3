import React, { useContext, useEffect, useRef, useState } from "react";
import { QuizContext } from "../context/Quiz";

type TimerType = {
	style: string;

	sec: number;
	setSec: React.Dispatch<React.SetStateAction<number>>;
	min: number;
	setMin: React.Dispatch<React.SetStateAction<number>>;
};

const Timer = ({ style, sec, setSec, min, setMin }: TimerType) => {
	let id = useRef<any>(null);
	function handleTime() {
		id.current = setInterval(() => {
			setSec((prev) => prev + 1);
		}, 1000);
	}

	useEffect(() => {
		handleTime();
		return () => {
			clearInterval(id.current);
		};
	}, []);

	useEffect(() => {
		if (sec >= 60) {
			setSec(0);
			setMin((prev) => prev + 1);
		}
	}, [sec]);

	return (
		<div className={style}>
			<div> Total</div>
			<div> {min < 10 ? "0" + min : min} </div>
			<div>:</div>
			<div>{sec < 10 ? "0" + sec : sec} </div>
		</div>
	);
};

export default Timer;
