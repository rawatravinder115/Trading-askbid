import React, { useEffect, useState } from "react";
import Ask from "../Fetch/Ask";
import Bid from "../Fetch/Bid";
import Card from "../UI/Card";

const CrossTowerFetch = () => {
	const [btcinr, setBtcinr] = useState({});
	const [decision, setDecision] = useState("Decision");
	const [time,setTime] = useState(Date.now());

	useEffect(() => {
		fetchData();
		decisionHandler();
		const interval = setInterval(() => setTime(Date.now()), 5000);
		return () => {
			clearInterval(interval);
		};
	}, [decision]);


	async function fetchData() {
		const response = await fetch(
			"https://api.crosstower.com/api/3/public/ticker"
		);
		const data = await response.json();

		setBtcinr(data.BTCUSD);
	}

	const decisionHandler = () => {
		let ask = btcinr.ask;
		let bid = btcinr.bid;
		let target = (ask + bid) / 2;

		let riskAsk = target - ask;
		let riskBid = target - bid;

		riskAsk = Math.sign(riskAsk) === -1 ? -riskAsk : riskAsk;

		if (riskAsk < riskBid) {
			setDecision("BUY");
		} else {
			setDecision("SELL");
		}
	};

	return (
		<Card>
			<div>
				<h1>CrossTower</h1>
			</div>
			<Ask high={btcinr.ask}></Ask>
			<Bid low={btcinr.bid}></Bid>
			<h1>{decision}</h1>
			{/* <button onClick={decisionHandler}>Check </button> */}
		</Card>
	);
};

export default CrossTowerFetch;
