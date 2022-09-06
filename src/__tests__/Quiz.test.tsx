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
import Quiz from "../Page/Quiz";
import * as router from "react-router";
import { requst } from "../utils/api";

const user = {
	displayName: "test",
};
describe("Quiz", () => {
	let renderResult: any;
	let setQuizInfo = jest.fn();

	const navigate = jest.fn();
	beforeEach(() => {
		jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

		renderResult = render(
			<AuthContext.Provider value={{ user }}>
				<QuizContext.Provider value={{ setQuizInfo }}>
					<Router>
						<Quiz />
					</Router>
				</QuizContext.Provider>
			</AuthContext.Provider>
		);
	});

	it("Quiz Select Check", () => {
		const { getByRole, getByText, debug } = renderResult;
		const button = getByText("Books");
		userEvent.click(button);
		expect(button).toHaveClass("bg-[#00df9a]");
	});

	it("Quiz 다음 button Check", () => {
		const { getByRole, getByText, debug } = renderResult;
		const button = getByText("다음");
		userEvent.click(button);
		const difficult = getByText("난이도");
		expect(difficult).toBeInTheDocument();
	});
});
