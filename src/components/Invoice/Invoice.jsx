import React, { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const Invoice = () => {
	const navigate = useNavigate();
	const ComponentDiv = useRef();
	const bool = true;
	useEffect(() => {
		handlePrint();
		navigate("/report/true");
	}, []);

	const handlePrint = useReactToPrint({
		content: () => ComponentDiv.current,
		documentTitle: "Purchase-Data",
	});
	return (
		<div ref={ComponentDiv}>
			<h1> My name is hasnat</h1>
		</div>
	);
};

export default Invoice;
