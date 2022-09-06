import React from "react";
import { Navigate } from "react-router";
import { UserAuth } from "../context/Auth";

type ProtectedType = {
	children: React.ReactNode;
};
const Protected = ({ children }: ProtectedType) => {
	const { user } = UserAuth();

	if (!user) {
		return <Navigate to="/signin" />;
	}

	return <>{children}</>;
};

export default Protected;
