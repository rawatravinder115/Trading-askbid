import { useState, useEffect } from "react";
import Ask from "../Fetch/Ask";
import Bid from "../Fetch/Bid";
import Card from "../UI/Card";
import classes from "./WazirXFetch.module.css";
const WazirXFetch = () => {
  const [Btcinr, setBtcinr] = useState({});
  const [decision, setDecision] = useState("Decision");
  const [time, setTime] = useState(Date.now());

  async function fetchData() {
    const response = await fetch("https://api.wazirx.com/api/v2/tickers");
    const data = await response.json();
    setBtcinr(data.btcinr);
    decisionHandler(data.btcinr);
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => setTime(Date.now()), 5000);
    return () => {
      clearInterval(interval);
    };
  }, );


  const decisionHandler = (data) => {
    let ask = +data.sell;
    let bid = +data.buy;
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
      <h4 className={classes.ridge_h1}>WazirX</h4>
      <tr>
        <td className={classes.ask}>
          <Ask high={Btcinr.sell}></Ask>
        </td>
        <td className={classes.bid}>
          <Bid low={Btcinr.buy}></Bid>
        </td>
        <td className={classes.decision}>
        <h4>Decision</h4>
          <h4>{decision}</h4>
        </td>
      </tr>
    </Card>
  );
};

export default WazirXFetch;
