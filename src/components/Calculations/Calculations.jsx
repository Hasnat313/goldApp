import React, { Component, useEffect, forwardRef } from "react";

import { getPurchaseFormData, getPurchaseFromCal, getTradeFormData, getTradeFromCal } from "../../api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Box, Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";

const date = new Date();
const d = date.getDate();
const mo = date.getMonth();
const y = date.getFullYear();
const h = date.getHours();
const m = date.getMinutes();
const string = `${d}/${mo}/${y}`;

const initialData = {
	reportID: "",
};
const Reports = () => {
	const { bool } = useParams();
	console.log(bool);
	const [isPurchaseReport, setPurchaseStatus] = useState(bool === "true" ? true : false);
	const [purchaseFormData, setPurchaseFormData] = useState({});
	const [tradeFormData, setTradeFormData] = useState({});
	const [loading, setLoading] = useState(true);
	console.log(loading);
	useEffect(() => {
		isPurchaseReport ? call() : call2();
	}, [isPurchaseReport]);

	useEffect(() => {
		bool === "true" ? setPurchaseStatus(true) : setPurchaseStatus(false);
	}, [bool]);

	async function call() {
		try {
			setLoading(true);
			const resp = await getPurchaseFromCal();
			console.log(resp);
			setLoading(false);
			const { data } = resp;
			setPurchaseFormData(data);
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	}

	async function call2() {
		try {
			setLoading(true);
			console.log("hasnat");
			const resp = await getTradeFromCal();
			console.log(resp);
			setLoading(false);
			const { data } = resp;
			setTradeFormData(data);
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<>
			<div>
				{loading ? (
					<Box textAlign="center">
						<RotatingLines strokeColor="grey" strokeWidth="3" animationDuration="0.75" width="40" visible={true} />
					</Box>
				) : isPurchaseReport ? (
					<Stack direction={"row"} spacing={2} mt={3} alignItems="center" justifyContent={"center"} sx={{ width: "100%" }}>
						<Card sx={{ minWidth: 275, height: 80, textAlign: "center", border: "2px solid black" }}>
							<CardContent>
								<Typography sx={{ fontSize: 14, background: "black", color: "white" }} gutterBottom>
									Cash
								</Typography>

								<Typography variant="body2">
									PKR &nbsp; &nbsp;
									{purchaseFormData?.Cash?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
								</Typography>
							</CardContent>
						</Card>
						<Card sx={{ minWidth: 275, height: 80, textAlign: "center", border: "2px solid black" }}>
							<CardContent>
								<Typography sx={{ fontSize: 14, background: "black", color: "white" }} gutterBottom>
									Pure Weight
								</Typography>

								<Typography variant="body2">
									Gram &nbsp; &nbsp;
									{purchaseFormData?.Pure?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
								</Typography>
							</CardContent>
						</Card>
					</Stack>
				) : (
					<Stack direction={"row"} spacing={2} mt={3} alignItems="center" justifyContent={"center"} sx={{ width: "100%" }}>
						<Card sx={{ minWidth: 200, height: 70, border: "2px solid black", textAlign: "center" }}>
							<CardContent sx={{ mt: "2px" }}>
								<Typography sx={{ fontSize: 14, background: "black", color: "white" }} gutterBottom>
									Sell PCS Gold
								</Typography>

								<Typography variant="body2">
									Gram &nbsp; &nbsp;
									{tradeFormData?.sellPCSGold?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
								</Typography>
							</CardContent>
						</Card>
						<Card sx={{ minWidth: 200, height: 70, border: "2px solid black", textAlign: "center" }}>
							<CardContent sx={{ mt: "2px" }}>
								<Typography sx={{ fontSize: 14, background: "black", color: "white" }} gutterBottom>
									Sell PCS Cash
								</Typography>

								<Typography variant="body2">
									PKR &nbsp; &nbsp;
									{tradeFormData?.sellPCSCash?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
								</Typography>
							</CardContent>
						</Card>
						<Card sx={{ minWidth: 200, height: 70, border: "2px solid black", textAlign: "center" }}>
							<CardContent sx={{ mt: "2px" }}>
								<Typography sx={{ fontSize: 14, background: "black", color: "white" }} gutterBottom>
									Sell Grami Gold
								</Typography>

								<Typography variant="body2">
									Gram &nbsp; &nbsp;
									{tradeFormData?.sellGramiGold?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
								</Typography>
							</CardContent>
						</Card>
						<Card sx={{ minWidth: 200, height: 70, border: "2px solid black", textAlign: "center" }}>
							<CardContent sx={{ mt: "2px" }}>
								<Typography sx={{ fontSize: 14, background: "black", color: "white" }} gutterBottom>
									Sell Grami Cash
								</Typography>

								<Typography variant="body2">
									PKR &nbsp; &nbsp;
									{tradeFormData?.sellGramiCash?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
								</Typography>
							</CardContent>
						</Card>
						<Card sx={{ minWidth: 200, height: 70, border: "2px solid black", textAlign: "center" }}>
							<CardContent sx={{ mt: "2px" }}>
								<Typography sx={{ fontSize: 14, background: "black", color: "white" }} gutterBottom>
									Sell Rawa Gold
								</Typography>

								<Typography variant="body2">
									Gram &nbsp; &nbsp;
									{tradeFormData?.sellRawaGold?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
								</Typography>
							</CardContent>
						</Card>
						<Card sx={{ minWidth: 200, height: 70, border: "2px solid black", textAlign: "center" }}>
							<CardContent sx={{ mt: "2px" }}>
								<Typography sx={{ fontSize: 14, background: "black", color: "white" }} gutterBottom>
									Sell Rawa Cash
								</Typography>

								<Typography variant="body2">
									PKR &nbsp; &nbsp;
									{tradeFormData?.sellRawaCash?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
								</Typography>
							</CardContent>
						</Card>
					</Stack>
				)}
			</div>
		</>
	);
};

export default Reports;
