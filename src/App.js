import React from "react";
import CrossTowerFetch from "./Components/Data/CrossTowerFetch";
import "./App.css";
import WazirXFetch from "./Components/Data/WazirXFetch";
import ZebpayFetch from "./Components/Data/ZebpayFetch";
import CoindcxFetch from "./Components/Data/CoindcxFetch";

function App() {
  return (
    <div className='home'>
      <CrossTowerFetch></CrossTowerFetch>
      <WazirXFetch></WazirXFetch>
      <ZebpayFetch></ZebpayFetch>
      <CoindcxFetch></CoindcxFetch>
    </div>
  );
}

export default App;
