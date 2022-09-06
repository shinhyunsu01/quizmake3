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
import * as router from "react-router";
import { AuthContext } from "../context/Auth";
import Init from "../Page/Init";
const user = {
	displayName: "test",
};
describe("Init", () => {
	let renderResult: any;
	const navigate = jest.fn();

	beforeEach(() => {
		jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
	});

	it("오답 노트 btn Click", () => {
		renderResult = render(
			<AuthContext.Provider value={{ user }}>
				<Init />
			</AuthContext.Provider>
		);
		const { getByRole, getByText, debug } = renderResult;
		const button = getByText("오답 노트");

		userEvent.click(button);
		expect(navigate).toHaveBeenCalledWith("/viewnote");
	});

	it("퀴즈 선택 btn Click", () => {
		renderResult = render(
			<AuthContext.Provider value={{ user }}>
				<Init />
			</AuthContext.Provider>
		);
		const { getByRole, getByText, debug } = renderResult;
		const button = getByText("퀴즈 선택");

		userEvent.click(button);
		expect(navigate).toHaveBeenCalledWith("/quiz");
	});
});
