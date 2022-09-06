import React from "react";
type ViewQuizType = {
	question: string;
};
const ViewQuiz = ({ question }: ViewQuizType) => {
	return (
		<div className="mx-6">
			<div className="text-2xl font-bold">Q. </div>
			<div className="pb-4">{question}</div>
		</div>
	);
};

export default ViewQuiz;
