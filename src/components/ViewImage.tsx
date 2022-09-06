import React, { useContext, useEffect, useState } from "react";
import { UserAuth } from "../context/Auth";
import { QuizContext } from "../context/Quiz";
import { Trash } from "../lib/icon";
import {
	firebaseImgDel,
	firebaseImgGet,
	firebaseSave,
} from "../utils/firebaseSave";
import { QuizType } from "../utils/type";

type ViewImageType = {
	data: string;
};

const ViewImage = ({ data }: ViewImageType) => {
	const [image, setImage] = useState<any>();

	useEffect(() => {
		readData(data);
	});

	const readData = async (data: string) => {
		if (data !== "") {
			const read = await firebaseImgGet({ fileName: data + ".jpg" });

			if (read) {
				setImage(read);
			}
		}
	};

	return (
		<div className=" absolute w-full h-full flex items-center justify-center">
			<img className="w-[300px] h-[400px] bg-white" src={image} />
		</div>
	);
};

export default ViewImage;
