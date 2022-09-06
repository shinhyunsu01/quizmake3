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
import App from "../App";

import ReactDOM from "react-dom";

import { BrowserRouter as Router, useNavigate } from "react-router-dom";

import { QuizContext, QuizContextProvider } from "../context/Quiz";
import QuizSolve from "../Page/QuizSolve";

describe("QuizSolve", () => {
	const quizInfo = {
		quizAll: [
			{
				category: "General Knowledge",
				correct_answer: "HTC",
				difficulty: "easy",
				incorrect_answers: ["Razer", "HTC", "Oculus", "Google"],
				question:
					"Which company did Valve cooperate with in the creation of the Vive?",
				selectList: ["Razer", "HTC", "Oculus", "Google"],
				type: "multiple",
			},
		],
	};
	const setQuizInfo = jest.fn();

	let renderResult: any;
	beforeEach(async () => {
		await waitFor(() => {
			renderResult = render(
				<QuizContext.Provider value={{ quizInfo, setQuizInfo }}>
					<Router>
						<QuizSolve />
					</Router>
				</QuizContext.Provider>
			);
		});
	});
	it("QuizSolve Select Next Button", () => {
		const { getByRole, getByPlaceholderText, debug } = renderResult;

		const button = screen.getByText("Razer");
		userEvent.click(button);
		expect(screen.getByText("다음")).toBeInTheDocument();
	});

	it("QuizSolve Select bg-white Button", () => {
		const { getByRole, getByPlaceholderText, debug } = renderResult;

		const button = screen.getByText("Razer");
		userEvent.click(button);
		expect(button).toHaveClass("bg-[#00df9a]");
	});

	it("Next Button Click", () => {
		const { getByRole, getByPlaceholderText, debug } = renderResult;

		const selected = screen.getByText("Razer");
		userEvent.click(selected);
		const button = screen.getByText("다음");
		userEvent.click(button);

		expect(setQuizInfo).toHaveBeenCalledTimes(1);
	});

	it("Next Button Click (setTimeout)", () => {
		jest.spyOn(global, "setTimeout");
		const { getByRole, getByPlaceholderText, debug } = renderResult;

		const selected = screen.getByText("Razer");
		userEvent.click(selected);
		const button = screen.getByText("다음");
		userEvent.click(button);

		expect(setTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
	});
});
