import { doc, getDoc, setDoc } from "@firebase/firestore";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from "@firebase/storage";

import { db, storage } from "../firebase/setup";
import { QuizType } from "./type";

type firebaseSaveType = {
	user: string;
	wrongQuiz?: any;
	question?: string;
};

type firebaseImgType = {
	imageURL: string;
};

type firebaseImgGetType = {
	fileName: string;
};

export const firebaseSave = async ({ user, wrongQuiz }: firebaseSaveType) => {
	const read = await getDoc(doc(db, "users", user));
	const readData = read.data();
	let loading = true;

	if (readData) {
		if (Object.keys(readData).includes("Quiz")) {
			const onequiz = readData?.Quiz;
			await setDoc(doc(db, "users", user), {
				Quiz: [...onequiz, wrongQuiz],
			});
		}
	} else {
		await setDoc(doc(db, "users", user), {
			Quiz: [wrongQuiz],
		});
	}
	loading = false;

	return loading;
};

export const firebaseModify = async ({
	user,
	wrongQuiz,
	question,
}: firebaseSaveType) => {
	const read = await getDoc(doc(db, "users", user));
	const readData = read.data();
	let loading = true;

	if (readData) {
		if (Object.keys(readData).includes("Quiz")) {
			const onequiz = readData?.Quiz;
			const filter = onequiz.map((one: QuizType) => {
				if (one.question === question) {
					one = wrongQuiz;
				}
				return one;
			});
			await setDoc(doc(db, "users", user), {
				Quiz: [...filter],
			});
		}
	} else {
		await setDoc(doc(db, "users", user), {
			Quiz: [wrongQuiz],
		});
	}
	loading = false;

	return loading;
};

export const firebaseImg = async ({ imageURL }: firebaseImgType) => {
	let blobBin = atob(imageURL.split(",")[1]);
	let arr = [];

	for (let cnt = 0; cnt < blobBin.length; cnt++) {
		arr.push(blobBin.charCodeAt(cnt));
	}
	let file = new Blob([new Uint8Array(arr)], { type: "image/png" });

	const fileName = Math.floor(100000 + Math.random() * 900000) + "";
	const storageRef = ref(storage, `images/${fileName}.jpg`);

	const fileData = await uploadBytes(storageRef, file);

	return fileData;
};

export const firebaseImgGet = async ({ fileName }: firebaseImgGetType) => {
	const data = await getDownloadURL(ref(storage, `images/${fileName}`));
	return data;
};

export const firebaseGet = async ({ user }: firebaseSaveType) => {
	const read = await getDoc(doc(db, "users", user));
	return read.data();
};

export const firebaseImgDel = async ({ fileName }: firebaseImgGetType) => {
	const read = await deleteObject(ref(storage, `images/${fileName}`));
	return read;
};
