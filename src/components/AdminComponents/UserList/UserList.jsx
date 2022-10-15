import React, { useEffect } from "react";

import style from "./UserList.module.css";
import { Button } from "@mui/material";
import { AllowUser } from "../../../api";

import { useState } from "react";

import { getUnverifiedUser } from "../../../api";
import Navbar from "../../Navbar/Navbar";

const UserList = () => {
	const [unverifiedUserList, setUnverifiedUserList] = useState([]);
	const [rerender, setRerender] = useState(false);
	useEffect(() => {
		call();
	}, [rerender]);

	console.log("called");
	async function call() {
		const userList = await getUnverifiedUser();
		setUnverifiedUserList([...userList]);
	}

	return (
		<>
			<table>
				<thead className={style.thead}>
					<tr>
						<th>User.ID</th>
						<th>Name</th>
						<th>Email Address</th>
						<th>Email Verified Status</th>
						<th>Allow</th>
						<th>Deny</th>
					</tr>
				</thead>
				<tbody>
					{unverifiedUserList.map((item) => (
						<tr key={item._id}>
							<td>{item._id}</td>
							<td>{item.name}</td>
							<td>{item.emailAddress1}</td>
							<td>{item.isEmailVerified && "true"}</td>
							<td>
								<Button
									variant="contained"
									size="small"
									onClick={() => {
										setRerender((prev) => !prev);
										AllowUser(item.uniqueKey, "true");
									}}
								>
									Allow
								</Button>
							</td>
							<td>
								<Button
									variant="contained"
									size="small"
									sx={{ width: "1px" }}
									onClick={() => {
										setRerender((prev) => !prev);
										AllowUser(item.uniqueKey, "false");
									}}
								>
									Deny
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default UserList;
