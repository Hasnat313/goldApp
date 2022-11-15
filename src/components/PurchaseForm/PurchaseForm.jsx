import React from "react";
import { useState } from "react";

import Input from "../input/Input";
import style from "./PurchaseForm.module.css";
import { TextField, Radio, FormControlLabel, RadioGroup, Typography, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { SubmitPurchaseForm } from "../../actions/PForm";
import { submitPurchaseForm } from "../../api";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Clock from "../Clock/Clock";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useFormik } from "formik";
import { purchaseFormNonRattiMilli, purchaseFormRattiMilli } from "../../validations/FormValidation";
const PurchaseForm = () => {
	const [disabled1, setDisabled] = useState("option1");
	const [rattiMilli, setRattiMilli] = useState("Ratti");
	// const [PFormData, SetPFormData] = useState({

	// });
	const { values, handleChange, handleSubmit, handleReset, errors } = useFormik({
		initialValues: {
			customer: "",
			pondWeight: 0,
			mail: 0,
			finalWeight: 0,
			gramRate: 0,
			pureWeight: 0,
			rate: 0,
			cash: 0,
			desc: "",
			ratti: 0,
			milli: 0,
			paymentMethod: "Cash",
		},
		validationSchema: disabled1 === "option1" ? purchaseFormNonRattiMilli : purchaseFormRattiMilli,
		onSubmit: async (values) => {
			try {
				const data = await submitPurchaseForm(values);
				console.log(data);
				if (data.status === 201) {
					alert("Added Successfully");
					handleReset();
				}
			} catch (e) {
				console.log(e);
			}
		},
	});
	const handleRattiMilli = (e) => {
		setRattiMilli(e.target.value);
	};
	console.log(values);
	const handleChangeDisabled = (e) => {
		console.log(e.target.value);
		setDisabled(e.target.value);
	};
	console.log(errors);

	values.finalWeight = values.pondWeight - values.mail;

	values.pureWeight = disabled1 === "option2" && (rattiMilli === "Ratti" ? (((values.ratti - 96) / 96) * (values.pondWeight - values.mail)).toFixed(3) : (((values.milli * 96 - 96) / 96) * (values.pondWeight - values.mail)).toFixed(3));

	values.cash = disabled1 === "option1" ? ((values.pondWeight - values.mail) * values.gramRate).toFixed(3) : ((values.rate * values.pureWeight) / 11.664).toFixed(3);
	const loginUserName = useSelector((state) => {
		return state.authFormData.authFormData.name;
	});

	if (disabled1 === "option2") {
		values.gramRate = "";
	}
	if (disabled1 === "option1") {
		values.rate = "";
		values.ratti = "";
		values.milli = "";
		values.pureWeight = "";
	}
	if (rattiMilli === "Ratti") {
		values.milli = "";
	} else {
		values.ratti = "";
	}

	return (
		<>
			<Clock name="Purchase" />
			<Box>
				<RadioGroup
					sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", width: "100%" }}
					aria-labelledby="demo-radio-buttons-group-label"
					defaultValue="option1"
					name="radio-buttons-group"
					onChange={handleChangeDisabled}
				>
					<FormControlLabel value="option1" control={<Radio />} label="Non Ratti Milli" />
					<FormControlLabel value="option2" control={<Radio />} label="Ratti Milli" />
				</RadioGroup>
			</Box>
			<div style={{ display: "inline-block", width: "100%" }}>
				<form autoComplete="off" noValidate className={style.form}>
					<TextField label="Customer" variant="outlined" value={values.customer} onChange={handleChange} name="customer" size="small" fullWidth />
					<Typography variant="body" sx={{ color: "red", alignSelf: "flex-start", fontSize: "15px" }}>
						{errors.customer}
					</Typography>
					<div className={style.pondWeight}>
						<Box display={"flex"} flexDirection={"column"} flex={1}>
							<TextField label="Pondweight" variant="outlined" type="number" value={values.pondWeight} onChange={handleChange} name="pondWeight" size="small" />
							<Typography variant="body" sx={{ color: "red", fontSize: "15px", my: "3px" }}>
								{errors.pondWeight}
							</Typography>
						</Box>
						<Box display={"flex"} flexDirection={"column"} flex={1}>
							<TextField label="Mail/Nagh" type="number" variant="outlined" value={values.mail} onChange={handleChange} name="mail" size="small" sx={{ flex: 1 }} />
							<Typography variant="body" sx={{ color: "red", fontSize: "15px", my: "3px" }}>
								{errors.mail}
							</Typography>
						</Box>
					</div>

					<div style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "50px" }}>
						<Box display={"flex"} flex={1}>
							<TextField label="Final Weight" type="number" variant="outlined" value={values.pondWeight - values.mail} name="finalWeight" size="small" sx={{ flex: 1 }} />
						</Box>
						<Box display={"flex"} flex={1} flexDirection={"column"}>
							<TextField disabled={disabled1 === "option2" && true} label="Rate/Gram" type="number" variant="outlined" value={values.gramRate} onChange={handleChange} name="gramRate" size="small" sx={{ flex: 1 }} />
							<Typography variant="body" sx={{ color: "red", fontSize: "15px", my: "3px" }}>
								{errors.gramRate}
							</Typography>
						</Box>
					</div>

					<div className={style.rmpureweight}>
						<TextField sx={{}} label="Pure Weight" type="number" variant="outlined" value={values.pureWeight} onChange={handleChange} name="pureWeight" size="small" className={style.pureWeight} disabled={disabled1 === "option1" && true} />
						<div style={{ flex: 1, flexDirection: "row", display: "flex" }}>
							<RadioGroup sx={{ flexDirection: "column" }} className={style.radioText} defaultValue="Ratti" onChange={handleRattiMilli}>
								<FormControlLabel value="Ratti" disabled={disabled1 === "option1" && true} control={<Radio />} label="Ratti" />
								<FormControlLabel value="Milli" disabled={disabled1 === "option1" && true} control={<Radio />} label="Mili" />
							</RadioGroup>
							<div className={style.autoRadio}>
								<TextField
									label=""
									type="number"
									disabled={(disabled1 === "option1" && true) || (rattiMilli === "Milli" && true)}
									variant="standard"
									onChange={rattiMilli === "Ratti" ? handleChange : () => {}}
									name="ratti"
									size="small"
									sx={{ marginBottom: "10px" }}
									value={values.ratti}
								/>
								<TextField
									label=""
									type="number"
									disabled={(disabled1 === "option1" && true) || (rattiMilli === "Ratti" && true)}
									variant="standard"
									onChange={rattiMilli === "Milli" ? handleChange : () => {}}
									name="milli"
									size="small"
									value={values.milli}
								/>
							</div>
						</div>
					</div>
					<TextField label="Rate" type="number" disabled={disabled1 === "option1" && true} variant="outlined" value={values.rate} onChange={handleChange} name="rate" size="small" fullWidth />
					<Typography variant="body" sx={{ color: "red", alignSelf: "flex-start", fontSize: "15px" }}>
						{errors.rate}
					</Typography>
					<div className={style.paymentMethod}>
						<Typography variant="h6" id={style.paymentLabel}>
							Payment Method
						</Typography>
						<RadioGroup sx={{ flexDirection: "row" }} className={style.paymentLabelChoice} defaultValue="Cash" value={values.paymentMethod} onChange={handleChange} name="paymentMethod">
							<FormControlLabel value="Pure" disabled={disabled1 === "option1" && true} control={<Radio />} label="Pure" sx={{ width: "25%" }} />
							<FormControlLabel value="Cash" control={<Radio />} label="Cash" sx={{ width: "25%" }} />
						</RadioGroup>
					</div>
					<TextField label="Cash" type="number" variant="outlined" value={values.cash} name="cash" size="small" fullWidth />
					<TextField label="Description" variant="outlined" value={values.desc} onChange={handleChange} name="desc" multiline rows={4} size="small" fullWidth />
					<div style={{ display: "flex", justifyContent: "flex-end", width: "100%", gap: "20px", alignItems: "center" }}>
						<Button variant="contained" size="medium" sx={{ width: "80px", backgroundColor: "gray" }} onClick={handleSubmit}>
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

export default PurchaseForm;
