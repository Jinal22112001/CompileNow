import React from "react";
import "./AboutMe.css";

const AboutUs = () => {
	return (
		<div className="ab_cnt">
			<div>
				<h2>Hi, I am Jinal Patel</h2>
				<p>
					I am a computer engineering final year undergraduate
					student.
				</p>
				<p>
					Since the previous two years, I've been working on my data
					structure and algorithms. CompileNow is my own project to
					showcase my web development abilities.
				</p>
				<div className="tmpp">
					<a
						href="mailto: jinal221101@gmail.com"
						target="_blank"
						rel="noreferrer"
					>
						Email
					</a>
					<a
						href="https://www.linkedin.com/in/jinal2211/"
						target="_blank"
						rel="noreferrer"
					>
						LinkedIn
					</a>
					<a
						href="https://www.instagram.com/jinal2001/"
						target="_blank"
						rel="noreferrer"
					>
						Instagram
					</a>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
