import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Button, { buttonStyle } from "../components/Button";
import { UserAuth } from "../context/Auth";

const Init: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="font-bold  flex flex-col justify-center items-center w-full h-[500px] border rounded-md mx-6">
			<div>총 10개 퀴즈 준비 되어 있습니다</div>
			<div>🔔</div>
			<div className="flex  justify-center">
				<Button handler={() => navigate("/viewnote")} name="오답 노트" />
				<Button handler={() => navigate("/quiz")} name="퀴즈 선택" />
			</div>
		</div>
	);
};

export default Init;
