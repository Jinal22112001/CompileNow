import "./Navbar.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	return (
		<div className="nav_mainDiv">
			<div className="nav_div1">
				<p onClick={() => navigate("/")}>CompileNow</p>
			</div>
			<div className="nav_div2">
				<Link to="/about">About Us</Link>
			</div>
		</div>
	);
};

export default Navbar;
