import React, { useEffect, useState } from "react";
import Ask from "../Fetch/Ask";
import Bid from "../Fetch/Bid";
import Card from "../UI/Card";
import classes from "./ZebpayFetch.module.css";

const ZebpayFetch = () => {
  const [btcinr, setBtcinr] = useState({});
  const [decision, setDecision] = useState("Decision");
  const [time, setTime] = useState(Date.now());

  async function fetchData() {
    const response = await fetch("https://www.zebapi.com/pro/v1/market/");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      if (data[i]["pair"] === "BTC-INR") {
        setBtcinr(data[i]);
        decisionHandler(data[i]);
        // refreshPage();
        break;
      }
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => setTime(Date.now()), 3000);
    return () => {
      clearInterval(interval);
    };
  },);

  function refreshPage() {
    window.location.reload(false,6000);
  }

  const decisionHandler = (btcinr) => {
    let ask = btcinr.sell;
    let bid = btcinr.buy;
    let target = (ask + bid) / 2;

    console.log(ask, bid,target);

    let riskAsk = target - ask;
    let riskBid = target - bid;

    riskAsk = Math.abs(riskAsk);

    console.log(target , riskAsk , riskBid)

    if (riskAsk < riskBid) {
      setDecision("BUY");
    } else if (riskAsk > riskBid) {
      setDecision("SELL");
    }
  };

  return (
      <Card>
        <h4 className={classes.ridge_h1}>ZebPay</h4>
        <tr>
          <td className={classes.ask}>
            <Ask high={btcinr.sell}></Ask>
          </td>
          <td className={classes.bid}>
            <Bid low={btcinr.buy}></Bid>
          </td>
          <td className={classes.decision}>
          <h4>Decision</h4>
          <h4>{decision}</h4>
          </td>
        </tr>
      </Card>
  );
};

export default ZebpayFetch;
