import {
	render,
	waitFor,
	fireEvent,
	queryByText,
	getByRole,
	screen,
	getByText,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { QuizContextProvider } from "../context/Quiz";
import Note from "../Page/Note";

const user = {
	displayName: "test",
};
describe("Note", () => {
	let renderResult: any;
	let handler = jest.fn();

	it("Note  Check", () => {
		renderResult = render(
			<AuthContext.Provider value={{ user }}>
				<QuizContextProvider>
					<Router>
						<Note />
					</Router>
				</QuizContextProvider>
			</AuthContext.Provider>
		);
		const { getByRole, getByText, debug } = renderResult;
	});
});
