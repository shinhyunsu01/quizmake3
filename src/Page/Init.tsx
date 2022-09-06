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
				<Link className={buttonStyle} to="/viewnote">
					오답 노트
				</Link>
				<Link className={buttonStyle} to="/quiz">
					퀴즈 선택
				</Link>
			</div>
		</div>
	);
};

export default Init;
