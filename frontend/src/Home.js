import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import "./Home.css";
import PopUp from "./pop-up/popUp";
import { ApiNameToFullName, getDateTime } from "./ExtraFunctions";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const [projects, setProjects] = useState(
		localStorage.getItem("CompileNow")
			? JSON.parse(localStorage.getItem("CompileNow"))
			: []
	);

	const [trigger, setTrigger] = useState(false);
	const [newProjectName, setNewProjectName] = useState("");
	const [NewProjectLang, setNewProjectLang] = useState("java");

	const createNewProjectHandler = () => {
		if (newProjectName === "") return;

		const date = getDateTime();
		const newProTMP = {
			Name: newProjectName,
			language: NewProjectLang,
			code: "",
			createdAtDate: date,
			LastUpdateDate: date,
		};
		const tmp = [...projects, newProTMP];
		setProjects(tmp);
		localStorage.setItem("CompileNow", JSON.stringify(tmp));
		navigate(`/editor/${tmp.length - 1}`);
	};

	const projectLanHandler = (e) => {
		setNewProjectLang(e.target.value);
	};

	return (
		<div>
			<Navbar></Navbar>

			<h1 className="dashboard_title">Dashboard</h1>
			<div className="HomeMainContainer">
				<div className="dashboard_index">
					<p>Project Name</p>
					<p>Language</p>
					<p>Created At</p>
					<p>Last Update</p>
				</div>
				<div className="home_addNewProject">
					<button onClick={() => setTrigger(!trigger)}>
						Add New Project
					</button>
				</div>

				<PopUp trigger={trigger}>
					<div className="Home_popup">
						<div className="Home_popup_title">
							<h2>Create New Project</h2>
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
							<select
								value={NewProjectLang}
								onChange={projectLanHandler}
							>
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
								CREATE
							</button>
							<button
								id="home_popup_cancelBtn"
								onClick={() => setTrigger(false)}
							>
								CANCEL
							</button>
						</div>
					</div>
				</PopUp>

				{projects.length <= 0 && (
					<div className="NoProject">Please Add some projects</div>
				)}

				{projects &&
					projects.map((project, inx) => (
						<div
							className="project_container"
							onClick={() => navigate(`/editor/${inx}`)}
							key={inx}
						>
							<p>{project.Name}</p>
							<p>{ApiNameToFullName(project.language)}</p>
							<p>{project.createdAtDate}</p>
							<p>{project.LastUpdateDate}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default Home;
