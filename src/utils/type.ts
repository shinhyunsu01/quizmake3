export const Title = [
	"any",
	"General Knowledge",
	"Books",
	"Film",
	"Music",
	"Musicals & Theatres",
	"Television",
	"Video Games",
	"Board Games",
	"Science & Nature",
	"Computers",
	"Mathematics",
	"Mythology",
	"Sports",
	"Geography",
	"History",
	"Politics",
	"Art",
	"Celebrities",
	"Animals",
	"Vehicles",
	"Comics",
	"Gadgets",
	"Japanese Anime & Manga",
	"Cartoon & Animations",
];
export const Difficult = ["Easy", "Medium", "Hard"];

export const Progress = [
	"max-w-[10%]",
	"max-w-[20%]",
	"max-w-[30%]",
	"max-w-[40%]",
	"max-w-[50%]",
	"max-w-[60%]",
	"max-w-[70%]",
	"max-w-[80%]",
	"max-w-[90%]",
	"max-w-[100%]",
];

export type QuizType = {
	answer: string;
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	result: boolean;
	selectList: string[];
	type: string;
	memo: string;
	imageUrl: string;
};
