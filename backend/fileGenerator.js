const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirFile = path.join(__dirname, "codeFiles");
var filePath;

if (!fs.existsSync(dirFile)) {
	fs.mkdirSync(dirFile, { recursive: true });
}

const fileGenerator = async (language, code) => {
	const jobId = uuid();
	const fileName = `${jobId}.java`;

	filePath = path.join(dirFile, fileName);

	await fs.writeFileSync(filePath, code);
	return filePath;
};

const fileDelate = async () => {
	fs.unlinkSync(filePath);
};

module.exports = {
	fileGenerator,
	fileDelate,
};
