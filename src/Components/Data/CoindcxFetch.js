import { useEffect, useState } from "react";
import Ask from "../Fetch/Ask";
import Bid from "../Fetch/Bid";
import Card from "../UI/Card";
import classes from "./CoindcxFetch.module.css";

const CoindcxFetch = () => {
  const [btcinr, setBtcinr] = useState({});
  const [decision, setDecision] = useState("Decision");
  const [time, setTime] = useState(Date.now());

  async function fetchData() {
    const response = await fetch("https://api.coindcx.com/exchange/ticker");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      if (data[i]["market"] === "BTCINR") {
        setBtcinr(data[i]);
        decisionHandler(data[i]);
        break;
      }
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => setTime(Date.now()), 5000);
    return () => {
      clearInterval(interval);
    };
  },);


  const decisionHandler = (btcinr) => {
    let ask = +btcinr.ask;
    let bid = +btcinr.bid;
    let target = (ask + bid) / 2;

    console.log(ask, bid,target);

    let riskAsk = target - ask;
    let riskBid = target - bid;

    riskAsk = Math.abs(riskAsk);

    console.log(target , riskAsk , riskBid)
    if (riskAsk <= riskBid) {
      setDecision("BUY");
    } else if (riskAsk > riskBid) {
      setDecision("SELL");
    }
  };

  return (
    <Card>
      <h4 className={classes.ridge_h1}>Coindcx</h4>
      <tr>
        <td className={classes.ask}>
          <Ask high={btcinr.ask}></Ask>
        </td>
        <td className={classes.bid}>
          <Bid low={btcinr.bid}></Bid>
        </td>
        <td className={classes.decision}>
          <h4>Decision</h4>
          <h4>{decision}</h4>
        </td>
      </tr>
    </Card>
  );
};

export default CoindcxFetch;
