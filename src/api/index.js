import axios from "axios";
import { useState } from "react";

// const url = "http://localhost:5000/purchaseForm/post";
const API = axios.create({
	baseURL: "http://localhost:5000",
	// baseURL: "https://goldappreal.herokuapp.com",
});

const token = JSON.parse(localStorage.getItem("userToken"));

export const submitPurchaseForm = (purchaseFormData) => API.post("/api/purchaseForm/post", purchaseFormData);
export const submitTradeForm = (tradeFormData) => API.post("/api/tradeForm/post", tradeFormData);
export const getPurchaseFromCal = () => API.get("/api/purchaseForm/getCashSum");
export const getTradeFromCal = () => API.get("/api/tradeForm/get/cashAndWeight");






export const authForm = async (authFormData) => {
	try {
		const resp = await API.post("/api/goldapp/signup", authFormData);
		return resp.data;
	} catch (e) {
		// return (e.response.data);
		// alert(e.response.data)

		// alert(e.response.data.message);
		return e.response.data.message;
	}
};

export const authFormLogin = async (authFormData) => {
	try {

		const resp = await API.post("/api/goldapp/signin", authFormData);
		return resp.data;
	} catch (e) {
		// return (e.response.data);
		// alert(e.response.data)
		// alert(e.response.data.message);
		return e.response.data.message;
	}
};

export const getPurchaseFormData = (pageSize, reportID, startDate, endDate) =>
	API.get(`/api/purchaseForm/get?pageSize=${pageSize}&&reportID=${reportID}&&startDate=${startDate}&&endDate=${endDate}`, {
		headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
	});
export const getTradeFormData = (pageSize, reportID, startDate, endDate) =>
	API.get(`/api/tradeForm/get?pageSize=${pageSize}&&reportID=${reportID}&&startDate=${startDate}&&endDate=${endDate}`, {
		headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
	});

export const getUnverifiedUser = async () => {
	try {
		console.log("get user called");
		const resp = await API.get("/api/admin/getUnverifiedUser", {
			headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
		});
		return resp.data;
	} catch (e) {
		return e.response.data.message;
	}
};

export const AllowUser = async (uniqueKey, status) => {
	try {
		console.log("allow user called");
		await API.post(`/api/admin/allowUser/${uniqueKey}/${status}`, {}, {
			headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
		});
	} catch (e) {
		return e.response;
	}
};
export const VerifyForgotPassword = async (id) => {
	try {
		const resp = await API.post(`/api/admin/allowUser/${id}/`);

		return resp.data;
	} catch (e) {
		return e.response;
	}
};
export const forgotPasswordEmailVerify = async (emailAddress) => {
	try {
		const resp = await API.post(`/api/forgotPassword/EmailVerify/`, emailAddress);

		return resp.data;
	} catch (e) {
		return e.response.data.message;
	}
};
export const changePassword = async (changePasswordData) => {
	try {
		const resp = await API.post(`/api/forgotPassword/changePassword/`, changePasswordData);

		return resp.data;
	} catch (e) {
		return e.response.data.message;
	}
};

export const frontEndAuthAPI = async (token) => {
	try {
		const resp = await API.post(`/api/frontEnd/auth/`, token);

		return resp.data;
	} catch (e) {
		return e.response.data.message;
	}
};
