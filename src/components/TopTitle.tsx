import React from "react";
type TopTitleType = {
	title: string;
};
const TopTitle = ({ title }: TopTitleType) => {
	return <div className="font-bold text-xl sm:text-2xl pb-2">{title}</div>;
};

export default TopTitle;
