import React from "react";
import "./Nav2.css";
const Nav2 = ({ Name, fontSize, setFontSize, setTrigger2 }) => {
	return (
		<div className="nv2_mainContainer">
			<div className="nv2_d1" onClick={() => setTrigger2(true)}>
				{Name}
			</div>
			<div className="nv2_d2">
				<div>
					<label>Font : </label>
					<select
						value={fontSize}
						onChange={(e) => {
							setFontSize(e.target.value);
						}}
					>
						<option value={14}>14</option>
						<option value={16}>16</option>
						<option value={18}>18</option>
						<option value={20}>20</option>
						<option value={24}>24</option>
						<option value={28}>28</option>
						<option value={32}>32</option>
						<option value={40}>40</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default Nav2;
