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
import WrongQuiz from "../components/WrongQuiz";

describe("WrongQuiz", () => {
	let renderResult: any;
	beforeEach(async () => {
		renderResult = render(
			<WrongQuiz quiz={["aa", "bb", "cc"]} select="bb" correctAnswer="cc" />
		);
	});
	it("QuizSolve wrong  Check", () => {
		const { getByRole, getByText, debug } = renderResult;

		expect(getByText("bb")).toBeInTheDocument();
	});
	it("QuizSolve correct  Check", () => {
		const { getByRole, getByText, debug } = renderResult;

		expect(getByText("cc")).toBeInTheDocument();
	});
});
