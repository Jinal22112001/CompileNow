import React, { useState } from "react";
import AceEditor from "react-ace";
import "./Editor.css";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Nav2 from "./Navbar/Nav2.js";
import axios from "axios";
import qs from "qs";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/ext-language_tools";
import { ApiNameToACEname, getDateTime } from "./ExtraFunctions";
import PopUp from "./pop-up/popUp";

const Editor = () => {
	const param = useParams();
	const navigate = useNavigate();

	const project = localStorage.getItem("CompileNow")
		? JSON.parse(localStorage.getItem("CompileNow"))
		: [];

	if (project.length <= param.id || param.id < 0) {
		navigate("/");
	}

	const [code, setCode] = useState(project ? project[param.id].code : "");
	const [output, setOutput] = useState(``);
	const [lan_Mod, setLanMod] = useState(
		project ? ApiNameToACEname(project[param.id].language) : "java"
	);
	const [lan_Mod_api, setLanMod_api] = useState(
		project ? project[param.id].language : "java"
	);
	const [fontSize, setFontSize] = useState(16);
	const [executing, setExecuting] = useState(false); // code running loader
	const [trigger, setTrigger] = useState(false); // for run code popup
	const [trigger2, setTrigger2] = useState(false); // for change name popup
	const [codeInput, SetCodeInput] = useState(""); //for code input
	const [newProjectName, setNewProjectName] = useState(
		project ? project[param.id].Name : ""
	); // for new project name
	const changeLanHandler = (e) => {
		const x = e.target.value;

		setLanMod(ApiNameToACEname(x));
		setLanMod_api(x);
	};

	const runCode = () => {
		setOutput("");
		setTrigger(false);
		setExecuting(true);

		const data = qs.stringify({
			code: code,
			language: lan_Mod_api,
			input: codeInput,
		});

		const config = {
			method: "post",
			url: "https://codex-api.herokuapp.com/",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			data: data,
		};

		axios(config)
			.then(function (response) {
				setExecuting(false);
				if (response.data.success) setOutput(response.data.output);
				else setOutput(response.data.error);
			})
			.catch(function (error) {
				setExecuting(false);
				setOutput(error);
			});
	};

	const save_code_handler = () => {
		project[param.id].code = code;
		project[param.id].language = lan_Mod_api;
		project[param.id].LastUpdateDate = getDateTime();
		localStorage.setItem("CompileNow", JSON.stringify(project));
	};

	const createNewProjectHandler = () => {
		if (newProjectName === "" || newProjectName.length > 15) return;
		project[param.id].Name = newProjectName;
		project[param.id].language = lan_Mod_api;
		localStorage.setItem("CompileNow", JSON.stringify(project));
		setTrigger2(false);
	};

	return (
		<div>
			<Navbar></Navbar>
			<Nav2
				Name={project[param.id].Name}
				fontSize={fontSize}
				setFontSize={setFontSize}
				setTrigger2={setTrigger2}
			></Nav2>

			{/* run code popup */}
			<PopUp trigger={trigger}>
				<div className="popUp_editor_mainDiv">
					<div className="popUp_editor_title">
						<h2>Input</h2>
						<p>
							If your code requires an input, please type it down
							below otherwise leave it empty.
						</p>
						<p>
							For multiple inputs, type in all your inputs line by
							line.
						</p>
					</div>
					<textarea
						name=""
						id=""
						rows="5"
						value={codeInput}
						placeholder="STD Input"
						onChange={(e) => SetCodeInput(e.target.value)}
					></textarea>
					<div className="popUp_editor_btn">
						<button
							className="popUp_editor_runBTN"
							onClick={runCode}
						>
							RUN
						</button>
						<button
							className="popUp_editor_cancelBTN"
							onClick={() => setTrigger(false)}
						>
							CANCEL
						</button>
					</div>
				</div>
			</PopUp>

			{/* change project name popup */}
			<PopUp trigger={trigger2}>
				<div className="Home_popup">
					<div className="Home_popup_title">
						<h2>Change Project Name</h2>
						<p>
							Project names shouldn't be empty or more than 15
							characters.
						</p>
					</div>
					<input
						type="text"
						value={newProjectName}
						placeholder="Project Name"
						onChange={(e) => setNewProjectName(e.target.value)}
					/>
					<div className="home_popup_lanSelect">
						<p> Select Language</p>
						<select value={lan_Mod_api} onChange={changeLanHandler}>
							<option value="java">Java</option>
							<option value="py">Python</option>
							<option value="cpp">C++</option>
							<option value="c">C</option>
							<option value="js">Js</option>
						</select>
					</div>
					<div className="Home_popup_btn">
						<button
							id="home_popup_createBtn"
							onClick={createNewProjectHandler}
						>
							Change
						</button>
						<button
							id="home_popup_cancelBtn"
							onClick={() => setTrigger2(false)}
						>
							CANCEL
						</button>
					</div>
				</div>
			</PopUp>

			<div className="editor_main_container">
				<div>
					<AceEditor
						mode={lan_Mod}
						theme="dracula"
						value={code}
						fontSize={parseInt(fontSize)}
						onChange={(e) => {
							setCode(e);
						}}
						showGutter={true}
						className="ace_editor"
						name="UNIQUE_ID_OF_DIV"
						wrapEnabled={true}
						highlightActiveLine={true}
						editorProps={{ $blockScrolling: true }}
						showPrintMargin={false}
						setOptions={{
							enableBasicAutocompletion: true,
							enableLiveAutocompletion: true,
							enableSnippets: true,
							showLineNumbers: true,
							tabSize: 2,
						}}
					/>
				</div>
				<div className="output_container">
					<h2>Output</h2>
					<div className="output_valuediv">
						{`${output}`}
						{executing && <div class="lds-dual-ring"></div>}
					</div>
					<div className="Myoutput_footer">
						<button
							disabled={executing}
							onClick={() => setTrigger(true)}
						>
							RUN
						</button>
						<select value={lan_Mod_api} onChange={changeLanHandler}>
							<option value="java">Java</option>
							<option value="py">Python</option>
							<option value="cpp">C++</option>
							<option value="c">C</option>
							<option value="js">Js</option>
						</select>
						<button onClick={save_code_handler}>SAVE</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Editor;
