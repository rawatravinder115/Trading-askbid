import React, { useEffect, useState } from "react";
import Ask from "../Fetch/Ask";
import Bid from "../Fetch/Bid";
import Card from "../UI/Card";
import classes from "./ZebpayFetch.module.css";

const ZebpayFetch = () => {
  const [btcinr, setBtcinr] = useState({});
  const [time, setTime] = useState(Date.now());
  const [decision, setDecision] = useState("Decision");

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => setTime(Date.now()), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function fetchData() {
    const response = await fetch("https://www.zebapi.com/pro/v1/market/");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      if (data[i]["pair"] === "BTC-INR") {
        setBtcinr(data[i]);
        decisionHandler(data[i]);
        break;
      }
    }
  }

  const decisionHandler = (btcinr) => {
    let ask = btcinr.sell;
    let bid = btcinr.buy;
    let target = (ask + bid) / 2;

    let riskAsk = target - ask;
    let riskBid = target - bid;

    riskAsk = Math.abs(riskAsk);

    if (riskAsk < riskBid) {
      setDecision("BUY");
    } else if (riskAsk > riskBid) {
      setDecision("SELL");
    }
  };

  return (
    <React.Fragment>
      <Card>
        <h1 className={classes.ridge_h1}>ZebPay</h1>
        <tr>
          <td className={classes.ask}>
            <Ask high={btcinr.sell}></Ask>
          </td>
          <td className={classes.bid}>
            <Bid low={btcinr.buy}></Bid>
          </td>
          <td className={classes.decision}>
            <h1>Decision</h1>
            <h1>{decision}</h1>
          </td>
        </tr>
      </Card>
    </React.Fragment>
  );
};

export default ZebpayFetch;
