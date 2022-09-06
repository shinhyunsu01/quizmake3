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
import { QuizContext, QuizContextProvider } from "../context/Quiz";
import ViewNote from "../Page/ViewNote";
import * as router from "react-router";

const user = {
	displayName: "test",
};
describe("Viewenote", () => {
	let renderResult: any;
	let handler = jest.fn();
	const navigate = jest.fn();
	const setQuizInfo = jest.fn();

	beforeEach(() => {
		jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
	});
	it("Viewenote No Data  Check", () => {
		renderResult = render(
			<AuthContext.Provider value={{ user }}>
				<QuizContextProvider>
					<Router>
						<ViewNote />
					</Router>
				</QuizContextProvider>
			</AuthContext.Provider>
		);
		const { getByRole, getByText, debug } = renderResult;
		const button = getByText("Home");
		userEvent.click(button);
		expect(navigate).toHaveBeenCalledWith("/signin");
	});
});
