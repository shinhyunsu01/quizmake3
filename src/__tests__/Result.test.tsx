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

import * as router from "react-router";
import Result from "../Page/Result";

const quizInfo = {
	quizAll: [
		{
			answer: "Femur",
			category: "Science & Nature",
			correct_answer: "Femur",
			difficulty: "easy",
			incorrect_answers: ["Femur", "Tibia", "Humerus", "Cranium"],
			question: "Which of these bones is hardest to break?",
			result: false,
			selectList: ["Femur", "Tibia", "Humerus", "Cranium"],
			type: "multiple",
		},
	],
};
describe("Result", () => {
	let renderResult: any;
	let setQuizInfo = jest.fn();

	const navigate = jest.fn();

	beforeEach(() => {
		jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
	});

	it("Result 다시 button Check", () => {
		renderResult = render(
			<QuizContext.Provider value={{ quizInfo, setQuizInfo }}>
				<Router>
					<Result />
				</Router>
			</QuizContext.Provider>
		);
		const { getByRole, getByText, debug, getByTestId } = renderResult;

		const button = getByText("다시");
		userEvent.click(button);
		expect(navigate).toHaveBeenCalledWith("/quizsolve");
	});

	it("Result 오답노트 button Check", () => {
		renderResult = render(
			<QuizContext.Provider value={{ quizInfo, setQuizInfo }}>
				<Router>
					<Result />
				</Router>
			</QuizContext.Provider>
		);
		const { getByRole, getByText, debug, getByTestId } = renderResult;

		const button = getByText("오답 노트");
		userEvent.click(button);
		expect(navigate).toHaveBeenCalledWith("/note");
	});
});
