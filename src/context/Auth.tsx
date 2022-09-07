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

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(authService, provider);
	};
	const logOut = () => {
		signOut(authService);
	};

	useEffect(() => {
		const logindata = onAuthStateChanged(authService, (current) => {
			setUser(current);
		});
		return logindata;
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
