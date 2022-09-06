const API_URL = "https://opentdb.com/api.php?";

export const requst = async (category: number, difficulty: string) => {
	const amount = 10;
	const fullUrl =
		API_URL +
		`amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
	const data = await (await fetch(fullUrl)).json();

	const makequiz = data.results.map((quiz: any) => {
		let selectAnswers = quiz.incorrect_answers;
		selectAnswers[3] = quiz.correct_answer;

		selectAnswers.sort(() => Math.random() - 0.5);
		quiz.selectList = selectAnswers;
		return quiz;
	});

	if (makequiz !== null) {
		return makequiz;
	}
	throw new Error("api 에러");
};
