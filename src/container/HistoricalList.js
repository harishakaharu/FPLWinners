import React, { useState } from "react";
import "../style/HistoricalList.css";
import { useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default function HistoricalList() {
  const winners = useSelector(
    (state) => state.winnerDetails.values.winnerValue
  );
  const losers = useSelector((state) => state.winnerDetails.values.losers);

  const winnerRef = firebase.database().ref("winnerValue");
  winnerRef.set(winners).then(() => {
    console.log("Data written successfully.");
  });
  const losersRef = firebase.database().ref("losers");
  losersRef.set(losers).then(() => {
    console.log("Data written successfully.");
  });
  const [flag, setFlag] = useState(0);
  return (
    <div>
      {!flag ? (
        <button
          className="historyBtn"
          onClick={() => setFlag(1)}
          disabled={winners.length === 0}
        >
          Click to view all winners till now.
        </button>
      ) : (
        <>
          {winners.map((data) => (
            <li key={data.month} className="viewdetails">
              <h4>{data.month}'s Winner</h4>
              <h4 className="losersName">{data.name}</h4>
            </li>
          ))}
          {losers.map((data) => (
            <li key={data.month} className="viewdetails">
              <h4>{data.month}'s Losers</h4>
              <h4 className="losersName">{data.name}</h4>
            </li>
          ))}
          <div className="viewdetails">
            <button className="closeBtn" onClick={() => setFlag(0)}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}
