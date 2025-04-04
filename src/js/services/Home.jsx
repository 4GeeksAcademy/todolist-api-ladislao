import React,{ useEffect } from "react";

import rigoImage from "../../img/rigo-baby.jpg";
import { getTodoList } from "./apiServices"

//create your first component
const Home = () => {
	useEffect(() => {
		getTodoList()
	}, [])

	return (
		<div className="text-center">
            

			<h1 className="text-center mt-5">Hello Rigo!</h1>
			<p>
				<img src={rigoImage} />
			</p>
			<a href="#" className="btn btn-success">
				If you see this green button... bootstrap is working...
			</a>
			<p>
				Made by{" "}
				<a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
				love!
			</p>
		</div>
	);
};

export default Home;