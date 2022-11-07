import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./trade.module.css";
import { TextField, Radio, FormControlLabel, RadioGroup, Typography, Button, Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Clock from "../Clock/Clock";
import { useFormik } from "formik";
import { submitTradeForm } from "../../api";
const TradeForm = () => {
	const [disabled1, setDisabled] = useState("option1");

	const { values, handleChange, handleSubmit, handleReset } = useFormik({
		initialValues: {
			name: "",
			weight: "",
			rate: "",
			type: "sellRawa",
			cash: "",
			desc: "",
		},
		onSubmit: async (values) => {
			try {
				const data = await submitTradeForm(values);
				console.log(data);
			} catch (e) {
				console.log(e);
			}
			alert(JSON.stringify(values, null, 2));
		},
	});
	values.cash = disabled1 === "option1" ? (values.weight * values.rate) / 11.664 : values.cash;
	values.weight = disabled1 === "option2" ? (values.cash / values.rate) * 11.664 : values.weight;

	console.log(values);

	return (
		<>
			<Clock name="Trade" />

			<div>
				<form autoComplete="off" noValidate className={style.form}>
					<TextField label="Name" variant="outlined" value={values.name} onChange={handleChange} name="name" size="small" fullWidth />
					<RadioGroup sx={{ width: "100%" }} value={values.type} onChange={handleChange} name="type">
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
					<TextField
						label="Weight"
						type="number"
						variant="outlined"
						value={values.weight}
						onChange={handleChange}
						name="weight"
						size="small"
						fullWidth
						onFocus={() => {
							setDisabled("option1");
						}}
					/>
					<TextField label="Rate" type="number" variant="outlined" value={values.rate} onChange={handleChange} name="rate" size="small" fullWidth />
					<TextField
						label="Cash"
						type="number"
						variant="outlined"
						value={values.cash}
						onChange={handleChange}
						name="cash"
						size="small"
						fullWidth
						onFocus={() => {
							setDisabled("option2");
						}}
					/>
					<TextField label="Description" variant="outlined" value={values.desc} onChange={handleChange} name="desc" multiline rows={4} size="small" fullWidth />
					<div style={{ display: "flex", justifyContent: "flex-end", width: "100%", gap: "20px", alignItems: "center" }}>
						<Button variant="contained" size="medium" sx={{ width: "80px" }} onClick={handleSubmit}>
							save
						</Button>
						<Button variant="contained" size="medium" sx={{ width: "80px" }} onClick={handleReset}>
							clear
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export default TradeForm;
