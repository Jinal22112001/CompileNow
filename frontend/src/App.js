import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import Editor from "./Editor";
import Home from "./Home.js";
import AboutMe from "./AboutMe";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/editor/:id" element={<Editor />} />
				<Route path="/about" element={<AboutMe />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
