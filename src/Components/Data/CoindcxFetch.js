import { useEffect, useState } from "react";
import Ask from "../Fetch/Ask";
import Bid from "../Fetch/Bid";
import Card from "../UI/Card";

const CoindcxFetch = () => {
  const [btcinr, setBtcinr] = useState({});
  const [time, setTime] = useState(Date.now());
  const [decision, setDecision] = useState("Decision");

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => setTime(Date.now()), 6000);
    return () => {
      clearInterval(interval);
    };
  }, [decision]);

  async function fetchData() {
    const response = await fetch("https://api.coindcx.com/exchange/ticker");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      if (data[i]["market"] === "BTCINR") {
        setBtcinr(data[i]);
        break;
      }
    }
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
    } else if (riskAsk > riskBid) {
      setDecision("SELL");
    }
  };

  return (
    <Card>
      <h1>Coindcx</h1>
      <Ask high={btcinr.ask}></Ask>
      <Bid low={btcinr.bid}></Bid>
      <h1>{decision}</h1>
    </Card>
  );
};

export default CoindcxFetch;
