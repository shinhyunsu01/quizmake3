import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
	const { googleSignIn, user } = UserAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user && Object.keys(user).includes("displayName")) navigate("/");
	}, [user]);

	return (
		<div className="h-screen w-full flex justify-center items-center">
			<div className="p-20 border border-w-2 border-green-300 rounded-2xl flex flex-col items-center space-y-[40px]">
				<div className="text-xl font-bold ">퀴즈!!</div>
				<div className="text-slate-500"># 문제 정보 만 기록이 됩니다 </div>
				<GoogleButton onClick={() => googleSignIn()} />
			</div>
		</div>
	);
};

export default SignIn;
