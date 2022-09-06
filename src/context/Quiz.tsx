import { createContext, useState } from "react";

type QuizType = {
	children: React.ReactElement;
};

export const QuizContext = createContext<any>(null);

export const QuizContextProvider = ({ children }: QuizType) => {
	const [quizInfo, setQuizInfo] = useState({});

	return (
		<QuizContext.Provider value={{ quizInfo, setQuizInfo }}>
			{children}
		</QuizContext.Provider>
	);
};
