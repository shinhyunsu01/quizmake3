import React from "react";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SignIn from "./Page/SignIn";
import { AuthContextProvider } from "./context/Auth";
import { QuizContextProvider } from "./context/Quiz";
import QuizSolve from "./Page/QuizSolve";
import Result from "./Page/Result";
import Note from "./Page/Note";
import ViewNote from "./Page/ViewNote";
import Init from "./Page/Init";
import Quiz from "./Page/Quiz";
import Protected from "./components/Protected";

function App() {
	return (
		<div className="max-w-3xl w-full h-screen mx-auto items-center justify-center flex ">
			<AuthContextProvider>
				<QuizContextProvider>
					<Router>
						<Routes>
							<Route
								path="/"
								element={
									<Protected>
										<Init />
									</Protected>
								}
							/>
							<Route path="/signin" element={<SignIn />} />
							<Route
								path="/quiz"
								element={
									<Protected>
										<Quiz />
									</Protected>
								}
							/>
							<Route
								path="/quizsolve"
								element={
									<Protected>
										<QuizSolve />
									</Protected>
								}
							/>
							<Route
								path="/result"
								element={
									<Protected>
										<Result />
									</Protected>
								}
							/>
							<Route
								path="/note"
								element={
									<Protected>
										<Note />
									</Protected>
								}
							/>
							<Route
								path="/viewnote"
								element={
									<Protected>
										<ViewNote />
									</Protected>
								}
							/>
						</Routes>
					</Router>
				</QuizContextProvider>
			</AuthContextProvider>
		</div>
	);
}
// <div className="max-w-3xl w-full h-screen mx-auto items-center justify-center flex ">
export default App;
