import React from "react";

import Auth from "./components/Auth/Auth";

import { Routes, Route } from "react-router-dom";
import PurchaseForm from "./components/PurchaseForm/PurchaseForm";
import UserList from "./components/AdminComponents/UserList/UserList";
import TradeForm from "./components/TradeForm/TradeForm";
import Reports from "./components/Reports/Reports";
import Calculations from "./components/Calculations/Calculations";
import View from "./components/View/View";
import RedirectPage from "./RedirectPage";
import ForgotPassword from "./components/Forgot Password/ForgotPassword";
import FrontEndAdminAuth from "./FrontEndAdminAuth";
import FrontEndUserAndAdminAuth from "./FrontEndUserAndAdminAuth";
import AutoLogin from "./AutoLogin";
import Invoice from "./components/Invoice/Invoice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Button } from "@mui/material";
import { useState } from "react";
import DrawerM from "./DrawerM";
import Insta from "./components/Insta";
const App = () => {
	// const [darakMode, setDarkMode] = useState(false);
	// const darkTheme = createTheme({
	// 	palette: {
	// 		mode: darakMode ? "dark" : "light",
	// 	},
	// 	lineColor: "white",
	// });
	// const handleChange = () => {
	// 	setDarkMode((prev) => !prev);
	// };
	return (
		<>
			<Routes>
				<Route path="/noInternet" element={<>Server Down</>} />
				<Route element={<AutoLogin />}>
					<Route path="/" element={<Auth />} />
				</Route>

				<Route path="/redirectPage" element={<RedirectPage />} />
				<Route path="/forgotPassword/:id/:pageStatus" element={<ForgotPassword />} />
				{/* <Route path="/drawer" element={<DrawerM />} />
				<Route path="/insta/" element={<Insta />} /> */}

				<Route element={<FrontEndUserAndAdminAuth />}>
					<Route path="/purchase" element={<PurchaseForm />} />
					<Route path="/trade" element={<TradeForm />} />
					<Route path="/view" element={<View />} />
					<Route
						path="/report/:bool"
						element={
							<>
								<Calculations />
								<Reports />
							</>
						}
					/>
					<Route path="/Invoice" element={<Invoice />} />
					<Route path="/admin" element={<FrontEndAdminAuth />}>
						<Route path="unverifiedUserList" element={<UserList />} />
					</Route>
				</Route>
				<Route path="*" element={<h1>Error 404 NOT FOUND</h1>} />
			</Routes>{" "}
		</>
	);
};

export default App;
