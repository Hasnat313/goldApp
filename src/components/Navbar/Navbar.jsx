import React from "react";
import { Link, useNavigate, NavLink, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
// import "antd/dist/antd.css";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { storeAuthFormData } from "../../features/authSlice";
import { Auth } from "../../Auth";
import { useState } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Drawer from "@mui/material/Drawer";

import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
const Navbar = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState("");
	useEffect(() => {
		let obj = localStorage.getItem("userData");

		dispatch(storeAuthFormData(JSON.parse(obj)));

		getRole();
	}, []);

	const navigate = useNavigate();

	const handleClick = () => {
		localStorage.removeItem("userData");
		localStorage.removeItem("userToken");
		navigate("/auth");
	};

	const getRole = async () => {
		const result = await Auth();
		setData(result.role);
	};

	const userData = useSelector((state) => {
		return state.authFormData.authFormData.name;
	});
	const user = userData !== undefined ? userData : null;

	const [open, setOpen] = useState(false);
	const [placement, setPlacement] = useState("left");

	const [state, setState] = React.useState({
		left: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		setState({ ...state, [anchor]: open });
	};
	return (
		<>
			<div>
				<Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)} elevation sx={{ "& .MuiDrawer-paperAnchorLeft": { backgroundColor: "black", color: "white" } }}>
					<Box sx={{ width: 240 }}>
						<Typography>Hasnat</Typography>
						<Typography>Badar</Typography>
						<Typography>Hasnat</Typography>
					</Box>
				</Drawer>
			</div>
			{/* <div className="container"></div> */}
			<div className="Navbar">
				<FormatListBulletedIcon onClick={toggleDrawer("left", true)} sx={{ cursor: "pointer" }} />
				<div className="NavBar-FirstItem">{user ? <h1>{userData}</h1> : null}</div>

				<div className="NavBar-SecondItem">
					<NavLink className={({ isActive }) => (isActive ? "active" : "unactive")} to="/purchase">
						{" "}
						Purchase{" "}
					</NavLink>
					<NavLink className={({ isActive }) => (isActive ? "active" : "unactive")} to="/trade">
						{" "}
						Trade{" "}
					</NavLink>
					{/* <NavLink className={({ isActive }) => (isActive ? "active" : "unactive")} to="/view">
						Reports
					</NavLink> */}
					<NavLink className={({ isActive }) => (isActive ? "active" : "unactive")} to="/report/true">
						Purchse Reports
					</NavLink>
					<NavLink className={({ isActive }) => (isActive ? "active" : "unactive")} to="/report/false">
						Trade Reports
					</NavLink>
				</div>
				<div className="NavBar-ThirdItem">
					{data === "admin" && (
						<Button component={Link} to="admin/unverifiedUserList" variant="contained" size="small" sx={{ width: "80px", alignSelf: "flex-end" }}>
							List
						</Button>
					)}
					{user ? (
						<Button component={Link} to="/" variant="contained" size="small" sx={{ width: "80px", alignSelf: "flex-end" }} onClick={handleClick}>
							Logout
						</Button>
					) : (
						<Button component={Link} to="/" variant="contained" size="small" sx={{ width: "80px", alignSelf: "flex-end" }}>
							Sign in
						</Button>
					)}
				</div>
			</div>
			{/* <Outlet /> */}
		</>
	);
};

export default Navbar;
