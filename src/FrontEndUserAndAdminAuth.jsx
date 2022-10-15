import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Auth } from "./Auth";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const FrontEndUserAndAdminAuth = () => {
	const [data, setData] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		getRole();
	}, []);
	const getRole = async () => {
		const result = await Auth();
		setData(result.role);

		if (result.role !== "admin" && result.role !== "user") {
			navigate("/");
		}
	};

	return (
		(data === "admin" || data === "user") && (
			<>
				<Navbar />
				<Outlet />
			</>
		)
	);
};

export default FrontEndUserAndAdminAuth;
