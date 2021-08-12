import { useState, useEffect } from "react";
import Ask from "../Fetch/Ask";
import Bid from "../Fetch/Bid";
import Card from "../UI/Card";
import classes from "./WazirXFetch.module.css";
const WazirXFetch = () => {
  const [Btcinr, setBtcinr] = useState({});
  const [time, setTime] = useState(Date.now());
  const [decision, setDecision] = useState("Decision");

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => setTime(Date.now()), 6000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function fetchData() {
    const response = await fetch("https://api.wazirx.com/api/v2/tickers");
    const data = await response.json();
    setBtcinr(data.btcinr);
    decisionHandler(data.btcinr);
  }

  const decisionHandler = (data) => {
    let ask = +data.sell;
    let bid = +data.buy;
    let target = (ask + bid) / 2;

    let riskAsk = target - ask;
    let riskBid = target - bid;

    riskAsk = Math.abs(riskAsk);

    if (riskAsk <= riskBid) {
      setDecision("BUY");
    } else if (riskAsk > riskBid) {
      setDecision("SELL");
    }
  };

  return (
    <Card>
      <h1 className={classes.ridge_h1}>WazirX</h1>
      <tr>
        <td className={classes.ask}><Ask high={Btcinr.sell}></Ask></td>
        <td className={classes.bid}><Bid low={Btcinr.buy}></Bid></td>
        <td className={classes.decision}>
          <h1>Decision</h1>
          <h1>{decision}</h1></td>
      </tr>
    </Card>
  );
};

export default WazirXFetch;
