import { useState, useEffect } from "react";
import Ask from "../Fetch/Ask";
import Bid from "../Fetch/Bid";
import Card from "../UI/Card";
const WazirXFetch = () => {
	const [Btcinr, setBtcinr] = useState({});
	const [time, setTime] = useState(Date.now());
	const [decision, setDecision] = useState("Decision");
	useEffect(() => {
		fetchData();
		decisionHandler();
		const interval = setInterval(() => setTime(Date.now()), 6000);
		return () => {
			clearInterval(interval);
		};
	}, [decision]);

	async function fetchData() {
		const response = await fetch("https://api.wazirx.com/api/v2/tickers");
		const data = await response.json();
		setBtcinr(data.btcinr);
	}

	const decisionHandler = () => {
		let ask = Btcinr.sell;
		let bid = Btcinr.buy;
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
			<h1>WazirX</h1>
			<Ask high={Btcinr.sell}></Ask>
			<Bid low={Btcinr.buy}></Bid>
			<h1>{decision}</h1>
			{/* <button onClick={decisionHandler}>Check </button> */}
		</Card>
	);
};

export default WazirXFetch;
