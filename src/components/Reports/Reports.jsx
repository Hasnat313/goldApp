import React, { Component, useEffect, forwardRef } from "react";
import Navbar from "../Navbar/Navbar";
import style from "./Reports.module.css";
import { Button, TextField, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import View from "../View/View";
import { getPurchaseFormData, getTradeFormData } from "../../api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { format } from "date-fns";
import { RotatingLines } from "react-loader-spinner";
import { Print, Search, DateRange } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
	const navigate = useNavigate();
	const [formdataArray, setFormDataArray] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [pageNumber, setPageNumber] = useState(0);
	const [isPurchaseReport, setPurchaseStatus] = useState(true);
	const [reportID, hanldeReportID] = useState();
	const [data, setData] = useState(initialData);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [date, setSendDate] = useState(false);
	const [showComp, setShowComp] = useState(true);
	const [loading, setLoading] = useState(true);

	const ComponentDivRef = useRef();
	const { bool } = useParams();

	useEffect(() => {
		isPurchaseReport ? call() : call2();
	}, [pageNumber, isPurchaseReport, reportID, date]);

	useEffect(() => {
		bool === "true" ? setPurchaseStatus(true) : setPurchaseStatus(false);
	}, [bool]);

	async function call() {
		try {
			const resp = await getPurchaseFormData(pageNumber, reportID, startDate, endDate);
			setLoading(false);

			const { data, total } = resp.data;
			const date = format(new Date(resp?.data.data[0]?.createdAt), "dd/MM/yyyy hh:mm:ss a");
			console.log(date);
			console.log(resp);
			setFormDataArray([...data]);

			setTotalPages(total);
		} catch (e) {}
	}
	async function call2() {
		try {
			const resp = await getTradeFormData(pageNumber, reportID, startDate, endDate);

			console.log(resp);

			setLoading(false);

			const { data, total } = resp.data;

			setFormDataArray([...data]);

			setTotalPages(total);
		} catch (e) {}
	}

	const goPrevious = () => {
		setPageNumber(Math.max(0, pageNumber - 1));
	};

	const goForward = () => {
		setPageNumber(Math.min(totalPages - 1, pageNumber + 1));
	};

	const pages = new Array(totalPages).fill(null).map((v, i) => i);
	const sellerName = useSelector((state) => {
		return state.authFormData.authFormData.name;
	});

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handlePrint = useReactToPrint({
		content: () => ComponentDivRef.current,
		documentTitle: "Purchase-Data",
		// onAfterPrint: () => {
		// 	alert("Print Success");
		// },
	});

	const handleSearch = () => {};
	console.log(startDate);
	console.log(endDate);
	const pickStartDate = (date) => {
		setStartDate(date);
	};
	const pickEndDate = (date) => {
		setEndDate(date);
	};

	return (
		<>
			<div>
				{!loading ? (
					<div>
						<div className={style.searchBar}>
							<div className={style.reportSearch}>
								<TextField
									label="Report ID"
									variant="outlined"
									value={data.reportID}
									onChange={handleChange}
									name="reportID"
									size="small"
									className={style.pureWeight}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Search />
											</InputAdornment>
										),
									}}
									onFocus={() => {
										// setSendDate((prev) => !prev);
									}}
								/>

								<Button
									variant="contained"
									size="small"
									onClick={() => {
										hanldeReportID(data.reportID);
									}}
								>
									Search ID
								</Button>
							</div>
							<div className={style.dateSearch}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="Start Date"
										value={startDate}
										onChange={(date) => {
											pickStartDate(date);
										}}
										renderInput={(params) => {
											return <TextField size="small" variant="outlined" {...params} />;
										}}
									/>
								</LocalizationProvider>
								<LocalizationProvider dateAdapter={AdapterDayjs} className={style.datePicker} label="End Date">
									<DatePicker
										label="End Date"
										value={endDate}
										size="small"
										onChange={(date) => {
											pickEndDate(date);
										}}
										renderInput={(params) => <TextField size="small" variant="outlined" {...params} />}
									/>
								</LocalizationProvider>

								<Button
									variant="contained"
									size="small"
									onClick={() => {
										setSendDate((prev) => !prev);
									}}
									className={style.dateSearchBtn}
									sx={{ width: "400px" }}
								>
									Search Date
								</Button>
							</div>

							<Button
								variant="contained"
								size=""
								onClick={() => {
									setSendDate((prev) => !prev);
									setData({
										reportID: "",
									});
									hanldeReportID("undefined");
									setStartDate(null);
									setEndDate(null);
								}}
								className={style.resetBtn}
							>
								Reset
							</Button>
						</div>
						<h3>Page No:{pageNumber + 1}</h3>

						<table>
							<thead className={style.thead}>
								<tr>
									<th>Report ID</th>
									<th>Name</th>
									{isPurchaseReport ? (
										<>
											<th>Orignal Pond</th>
											<th>Mail</th>
											<th>Pond</th>
											<th>Pure</th>
										</>
									) : (
										<>
											<th>Weight</th>
											<th>Rate</th>
											<th>Type</th>
											<th>Cash</th>
										</>
									)}
									<th>Date/Time</th>
									<th>Seller Name</th>
									<th>Print</th>
									{/* <th>View</th> */}
								</tr>
							</thead>
							<tbody>
								{isPurchaseReport
									? formdataArray.map((item) => (
											<tr key={item._id}>
												<td>{item.reportID}</td>
												<td>{item.customer}</td>
												<td>{item.pondWeight}</td>
												<td>{item.finalWeight}</td>
												<td>{item.gramRate}</td>
												<td>{item.pureWeight}</td>
												<td>{format(new Date(item?.createdAt), "dd/MM/yy hh:mm a")}</td>
												<td>{item.customer}</td>
												<td>
													<Button
														variant="contained"
														size="small"
														onClick={() => {
															navigate("/Invoice");
															// handlePrint();
														}}
													>
														Print
														<Print fontSize="small" />
													</Button>
												</td>
												{/* <td>
												<Button variant="contained" size="small" sx={{ width: "1px" }}>
													View
												</Button>
											</td> */}
											</tr>
									  ))
									: formdataArray.map((item) => (
											<tr key={item._id}>
												<td>{item.reportID}</td>
												<td>{item.name}</td>
												<td>{item.weight}</td>
												<td>{item.rate}</td>
												<td>{item.type}</td>
												<td>{Math.round(item.cash * 100) / 100}</td>
												<td>{format(new Date(item?.createdAt), "dd/MM/yy hh:mm a")}</td>

												<td>{"Hasnat"}</td>

												<td>
													<Button
														variant="contained"
														size="small"
														onClick={() => {
															navigate("/Invoice");
															// handlePrint();
														}}
													>
														Print
														<Print fontSize="small" />
													</Button>
												</td>
												{/* <td>
												<Button variant="contained" size="small" sx={{ width: "1px" }}>
													View
												</Button>
											</td> */}
											</tr>
									  ))}
							</tbody>
						</table>

						<div className={style.button}>
							<button
								onClick={() => {
									goPrevious();
								}}
							>
								{"<"}
							</button>
							{pages.map((pageIndex) => (
								<button
									key={pageIndex}
									onClick={() => {
										setPageNumber(pageIndex);
									}}
								>
									{pageIndex + 1}
								</button>
							))}
							<button
								onClick={() => {
									goForward();
								}}
							>
								{">"}
							</button>
						</div>

						<div ref={ComponentDivRef} className={`${showComp && style.hideComp}`}>
							<h1> My name is hasnat</h1>
						</div>
					</div>
				) : (
					<div className={style.spinner}>
						<RotatingLines strokeColor="grey" strokeWidth="3" animationDuration="0.75" width="40" visible={true} />
					</div>
				)}
			</div>
		</>
	);
};

export default Reports;
