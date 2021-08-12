import React, { useEffect, useState } from "react";
import Ask from "../Fetch/Ask";
import Bid from "../Fetch/Bid";
import Card from "../UI/Card";
import classes from "./CrossTowerFetch.module.css";

const CrossTowerFetch = () => {
  const [btcinr, setBtcinr] = useState({});
  const [decision, setDecision] = useState("Decision");
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => setTime(Date.now()), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function fetchData() {
    const response = await fetch(
      "https://api.crosstower.com/api/3/public/ticker"
    );
    const data = await response.json();

    setBtcinr(data.BTCUSD);
    decisionHandler(data.BTCUSD);
  }

  const decisionHandler = (btcinr) => {
    let ask = +btcinr.ask;
    let bid = +btcinr.bid;
    let target = (ask + bid) / 2;

    console.log(target);

    let riskAsk = target - ask;
    let riskBid = target - bid;

    riskAsk = Math.abs(riskAsk);
    console.log(riskAsk, riskBid);

    if (riskAsk <= riskBid) {
      setDecision("BUY");
    } else if (riskAsk > riskBid) {
      setDecision("SELL");
    }
  };

  return (
    <Card>
      <h1 className={classes.ridge_h1}>CrossTower</h1>
      <tr>
        <td className={classes.ask}> 
          <Ask high={btcinr.ask}></Ask>
        </td>
        <td className={classes.bid}>
          <Bid low={btcinr.bid}></Bid>
        </td>
        <td className={classes.decision}>
			<h1>Decision</h1>
          <h1>{decision}</h1>
        </td>
      </tr>
    </Card>
  );
};

export default CrossTowerFetch;
