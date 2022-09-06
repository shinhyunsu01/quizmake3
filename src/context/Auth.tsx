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
		//const unsubscribe =
		onAuthStateChanged(authService, (current) => {
			setUser(current);
		});
		return () => {
			console.log("ok", user);
			unsubscribe();
		};
	});

	return (
		<AuthContext.Provider value={{ googleSignIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
