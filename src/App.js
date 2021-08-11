import React from "react";
import CrossTowerFetch from "./Components/Data/CrossTowerFetch";
import "./App.css";
import WazirXFetch from "./Components/Data/WazirXFetch";
import ZebpayFetch from "./Components/Data/ZebpayFetch";
import CoindcxFetch from "./Components/Data/CoindcxFetch";

function App() {
	return <React.Fragment >
      <CrossTowerFetch></CrossTowerFetch>
      <ZebpayFetch></ZebpayFetch>
      <WazirXFetch></WazirXFetch>
      <CoindcxFetch></CoindcxFetch>
  </React.Fragment>;
}

export default App;
