import React from "react";
import { useSelector } from "react-redux";
import "../style/ShowWinnerLosers.css";

export default function ShowWinnerLosers() {
  let name = useSelector((state) => state.winnerDetails.thisMonth);
  const winnerDetails = useSelector(
    (state) => state.winnerDetails.values.winnerValue
  );
  const thisMonthWinner = winnerDetails.find((data) => data.month === name);
  const loserDetails = useSelector(
    (state) => state.winnerDetails.values.losers
  );
  const thisMonthLoser = loserDetails.find((data) => data.month === name);
  const thisMonthSpend = useSelector(
    (state) => state.winnerDetails.values.spendDetails
  ).find((data) => data.month === name);
  return (
    <>
      <div className="showwinnerloser">
        <div className="container">
          <h3>{name}'s Winner : </h3>
          <div className="winner">
            <img src={thisMonthWinner.data} alt={thisMonthWinner.month} />
          </div>
        </div>
        <div className="container">
          <h3>{name}'s Losers : </h3>
          <div className="winner">
            <img src={thisMonthLoser.loserDetails} alt={thisMonthLoser.month} />
          </div>
        </div>
      </div>
      <div className="showwinnerloser">
        <h3>
          {thisMonthSpend.month}'s spend : INR {thisMonthSpend.data}
        </h3>
      </div>
    </>
  );
}
