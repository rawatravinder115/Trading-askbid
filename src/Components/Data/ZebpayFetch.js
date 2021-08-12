import React, { useEffect, useState } from "react";
import Ask from "../Fetch/Ask";
import Bid from "../Fetch/Bid";
import Card from "../UI/Card";

const ZebpayFetch = () => {
	const [btcinr,setBtcinr] = useState({});
	const [time,setTime] = useState(Date.now());
	const [decision , setDecision] = useState("Decision");

	useEffect(() => {
		fetchData();
		const interval = setInterval(() => setTime(Date.now()), 5000);
		return () => {
			clearInterval(interval);
		};
	}, [decision]);

	async function fetchData() {
		const response = await fetch("https://www.zebapi.com/pro/v1/market/");
		const data = await response.json();

		for(let i =0 ; i < data.length ;i++){
            if(data[i]["pair"] === 'BTC-INR'){
                setBtcinr(data[i]);
                break;
            }
        }
	}

	const decisionHandler = () => {

		let ask = btcinr.sell;
        let bid = btcinr.buy;
		let target = ( ask + bid) / 2;

		let riskAsk = target - ask ;
		let riskBid = target - bid;

		riskAsk = Math.sign(riskAsk) === -1 ? -riskAsk : riskAsk;

        if(riskAsk < riskBid){
            setDecision("BUY");
        }else if(riskAsk > riskBid) {
            setDecision("SELL");
        }
	};

	return (
		<React.Fragment>
			<Card>
				<h1>ZebPay</h1>
				<Ask high ={btcinr.sell}></Ask>
				<Bid low= {btcinr.buy}></Bid>
				<h1>{decision}</h1>
			</Card>
		</React.Fragment>
	);
};

export default ZebpayFetch;
