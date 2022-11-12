const express = require("express");
const { fileGenerator, fileDelate } = require("./fileGenerator");
const { executeCode } = require("./executeCode");
var cors = require("cors");
// const serverless = require("serverless-http");

const app = express();
// const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);

app.get("/", (req, res) => {
	return res.json({
		jinal: "jinal",
	});
});

app.post("/run", async (req, res) => {
	const { language, code, input } = req.body;
	if (language === undefined || language === "") {
		return res.json({
			success: false,
			error: "language should be selected",
		});
	}
	try {
		const filePath = await fileGenerator(language, code);
		const output = await executeCode(filePath, input);
		fileDelate();
		return res.json({ success: true, path: filePath, output });
	} catch (err) {
		return res.json(err);
	}
});

app.listen(5000, () => {
	console.log("listening to port 5000!");
});
// module.exports = app;
// module.exports.handler = serverless(app);
