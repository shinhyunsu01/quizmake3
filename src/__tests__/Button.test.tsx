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
import Button from "../components/Button";

describe("Button", () => {
	let renderResult: any;
	let handler = jest.fn();
	beforeEach(async () => {
		renderResult = render(
			<Router>
				<Button handler={handler} name="aa" style="bb" id="prev" />
			</Router>
		);
	});
	it("Button  Check", () => {
		const { getByRole, getByText, debug } = renderResult;

		expect(getByText("aa")).toBeInTheDocument();
	});
});
