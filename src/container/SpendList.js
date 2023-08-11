import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../style/SpendList.css";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default function SpendList() {
  const monthlySpend = useSelector(
    (state) => state.winnerDetails.values.spendDetails
  );
  const [flag, setFlag] = useState(0);
  const monthlySpendRef = firebase.database().ref("spendDetails");
  monthlySpendRef.set(monthlySpend).then(() => {
    console.log("Data written successfully.");
  });
  return (
    <div>
      {!flag ? (
        <button
          className="historyBtn"
          onClick={() => setFlag(1)}
          disabled={monthlySpend.length === 0}
        >
          Click to view all expenditures!
        </button>
      ) : (
        monthlySpend.map((data) => (
          <>
            <div className="containerSpend" key={data.month}>
              <li className="losersName">
                {data.month}'s cost : INR {data.data}
              </li>
            </div>
          </>
        ))
      )}
      {flag?<div className="containerSpend">
        <button className="closeBtn" onClick={() => setFlag(0)}>
          Close
        </button>
      </div>:''}
    </div>
  );
}
