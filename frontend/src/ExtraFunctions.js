export const ApiNameToNormal = (x) => {
	if (x === "java") {
		return x;
	} else if (x === "c") {
		return x;
	} else if (x === "cpp") {
		return "C++";
	} else if (x === "py") {
		return "Python";
	} else {
		return "JavaScript";
	}
};

export const ApiNameToACEname = (x) => {
	if (x === "java") {
		return x;
	} else if (x === "c") {
		return "c_cpp";
	} else if (x === "cpp") {
		return "c_cpp";
	} else if (x === "py") {
		return "python";
	} else {
		return "javascript";
	}
};

export const ApiNameToFullName = (x) => {
	if (x === "java") {
		return "Java";
	} else if (x === "c") {
		return "C";
	} else if (x === "cpp") {
		return "C++";
	} else if (x === "py") {
		return "Python";
	} else {
		return "JavaScript";
	}
};

export const getDateTime = () => {
	var today = new Date();
	// var time = "Time: " + today.getHours() + ":" + today.getMinutes();

	var date =
		today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();

	return date;
};
