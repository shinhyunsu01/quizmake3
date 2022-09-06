import { useContext, createContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	getRedirectResult,
	GithubAuthProvider,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";

import { authService } from "../firebase/setup";
import { useNavigate } from "react-router";

export const AuthContext = createContext<any>(undefined);

type AuthType = {
	children: React.ReactElement;
};

export const AuthContextProvider = ({ children }: AuthType) => {
	const [user, setUser] = useState<any>({});
	const navigate = useNavigate();

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(authService, provider);
	};
	const logOut = () => {
		signOut(authService);
	};
	console.log("ok");
	useEffect(() => {
		onAuthStateChanged(authService, (current) => {
			console.log("1ok", current);
			if (current && Object.keys(current).includes("displayName")) {
				setUser(current);
				navigate("/");
			} else {
				navigate("/signin");
			}
		});
	}, []);

	return (
		<AuthContext.Provider value={{ googleSignIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
