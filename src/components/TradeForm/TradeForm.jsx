import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./trade.module.css";
import { TextField, Radio, FormControlLabel, RadioGroup, Typography, Button } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Clock from "../Clock/Clock";

const TradeForm = () => {
	const [TFormData, SetTFormData] = useState({
		name: "",
		weight: "",
		rate: "",
		cash: "",
		desc: "",
	});
	const handleSubmit = (e) => {};
	const handleChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		SetTFormData({
			...TFormData,
			[name]: value,
		});
	};
	return (
		<div>
			<Clock name="Trade" />
			<form autoComplete="off" noValidate className={style.form}>
				<TextField label="Name" variant="outlined" value={TFormData.name} onChange={handleChange} name="name" size="small" fullWidth />
				<RadioGroup sx={{ width: "100%" }}>
					<div className={style.sellBuy}>
						<p>Rawa</p>
						<FormControlLabel value="sellRawa" control={<Radio />} label="Sell" />
						<FormControlLabel value="buyRawa" control={<Radio />} label="Buy" />
					</div>
					<div className={style.sellBuy}>
						<p>PCS</p>
						<FormControlLabel value="sellPCS" control={<Radio />} label="Sell" sx={{ marginLeft: "1px" }} />
						<FormControlLabel value="buyPCS" control={<Radio />} label="Buy" />
					</div>
					<div className={style.sellBuy}>
						<p>Grami</p>
						<FormControlLabel value="sellGrami" control={<Radio />} label="Sell" />
						<FormControlLabel value="buyGrami" control={<Radio />} label="Buy" />
					</div>
				</RadioGroup>
				<TextField label="Cash" type="number" variant="outlined" value={TFormData.cash} onChange={handleChange} name="cash" size="small" fullWidth />
				<TextField label="Rate" type="number" variant="outlined" value={TFormData.rate} onChange={handleChange} name="rate" size="small" fullWidth />
				<TextField label="Description" variant="outlined" value={TFormData.desc} onChange={handleChange} name="desc" multiline rows={4} size="small" fullWidth />
				<div style={{ display: "flex", justifyContent: "flex-end", width: "100%", gap: "20px", alignItems: "center" }}>
					<Button variant="contained" size="medium" sx={{ width: "80px" }} onClick={handleSubmit}>
						save
					</Button>
					<Button variant="contained" size="medium" sx={{ width: "80px" }}>
						clear
					</Button>
				</div>
			</form>
		</div>
	);
};

export default TradeForm;
