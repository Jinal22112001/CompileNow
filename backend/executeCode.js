const { exec } = require("child_process");

const executeCode = (filePath, input) => {
	return new Promise((resolve, reject) => {
		const codeExec = exec(
			`java ${filePath}`,
			{ timeout: 8000 },
			(error, stdout, stderr) => {
				error && reject({ error, stderr });
				stderr && reject(stderr);
				resolve(stdout);
			}
		);
		if (input) {
			codeExec.stdin.write(input);
			codeExec.stdin.end();
		}
	});
};

module.exports = {
	executeCode,
};
