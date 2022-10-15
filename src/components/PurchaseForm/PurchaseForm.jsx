import React from "react";
import { useState } from "react";

import Input from "../input/Input";
import style from "./PurchaseForm.module.css";
import { TextField, Radio, FormControlLabel, RadioGroup, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// import { SubmitPurchaseForm } from "../../actions/PForm";
import { submitPurchaseForm } from "../../api";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Clock from "../Clock/Clock";

const PurchaseForm = () => {
	const [PFormData, SetPFormData] = useState({
		customer: "",
		pondWeight: "",
		mail: "",
		finalWeight: "",
		gramRate: "",
		pureWeight: "",
		rate: "",
		cash: "",
		desc: "",
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		submitPurchaseForm(PFormData);
		// dispatch(SubmitPurchaseForm(PFormData));
	};
	const loginUserName = useSelector((state) => {
		return state.authFormData.authFormData.name;
	});
	const handleChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		SetPFormData({
			...PFormData,
			sellerName: loginUserName,
			[name]: value,
		});
	};

	return (
		<>
			<Clock name="Purchase" />
			<div style={{ display: "inline-block", width: "100%" }}>
				<form autoComplete="off" noValidate className={style.form}>
					<TextField label="Customer" variant="outlined" value={PFormData.customer} onChange={handleChange} name="customer" size="small" fullWidth />
					<div className={style.pondWeight}>
						<TextField label="Pondweight" variant="outlined" type="number" value={PFormData.pondWeight} onChange={handleChange} name="pondWeight" size="small" sx={{ flex: 1 }} />
						<TextField label="Mail/Nagh" type="number" variant="outlined" value={PFormData.mail} onChange={handleChange} name="mail" size="small" sx={{ flex: 1 }} />
					</div>
					<div style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "50px" }}>
						<TextField label="Final Weight" type="number" variant="outlined" value={PFormData.finalWeight} onChange={handleChange} name="finalWeight" size="small" sx={{ flex: 1 }} />
						<TextField label="Gram/Rate" type="number" variant="outlined" value={PFormData.gramRate} onChange={handleChange} name="gramRate" size="small" sx={{ flex: 1 }} />
					</div>

					<div className={style.rmpureweight}>
						<TextField sx={{}} label="Pure Weight" type="number" variant="outlined" value={PFormData.pureWeight} onChange={handleChange} name="pureWeight" size="small" className={style.pureWeight} />
						<div style={{ flex: 1, flexDirection: "row", display: "flex" }}>
							<RadioGroup sx={{ flexDirection: "column" }} className={style.radioText}>
								<FormControlLabel value="Ratti" control={<Radio />} label="Ratti" />
								<FormControlLabel value="Milli" control={<Radio />} label="Mili" />
							</RadioGroup>
							<div className={style.autoRadio}>
								<TextField label="" type="number" variant="standard" onChange={handleChange} name="" size="small" sx={{ marginBottom: "10px" }} value={""} />
								<TextField label="" type="number" variant="standard" onChange={handleChange} name="" size="small" value={""} />
							</div>
						</div>
					</div>
					<TextField label="Rate" type="number" variant="outlined" value={PFormData.rate} onChange={handleChange} name="rate" size="small" fullWidth />
					<div className={style.paymentMethod}>
						<Typography variant="h6" id={style.paymentLabel}>
							Payment Method
						</Typography>
						<RadioGroup sx={{ flexDirection: "row" }} className={style.paymentLabelChoice}>
							<FormControlLabel value="Pure" control={<Radio />} label="Pure" sx={{ width: "25%" }} />
							<FormControlLabel value="Cash" control={<Radio />} label="Cash" sx={{ width: "25%" }} />
						</RadioGroup>
					</div>
					<TextField label="Cash" type="number" variant="outlined" value={PFormData.cash} onChange={handleChange} name="cash" size="small" fullWidth />
					<TextField label="Description" variant="outlined" value={PFormData.desc} onChange={handleChange} name="desc" multiline rows={4} size="small" fullWidth />
					<div style={{ display: "flex", justifyContent: "flex-end", width: "100%", gap: "20px", alignItems: "center" }}>
						<Button variant="contained" size="medium" sx={{ width: "80px", backgroundColor: "gray" }} onClick={handleSubmit}>
							save
						</Button>
						<Button variant="contained" size="medium" sx={{ width: "80px" }}>
							clear
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export default PurchaseForm;
