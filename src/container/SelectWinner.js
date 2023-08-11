import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/selectWinner.css";
import { winnerAction } from "../store/showWinnerslice";
export default function SelectWinner() {
  const [spend, setSpend] = useState(0);
  const data = useSelector((state) => state.winnerDetails.values.selectWinner);
  const dispatch = useDispatch();
  let name = useSelector((state) => state.winnerDetails.thisMonth);
  const selectedIndex = useSelector(
    (state) => state.winnerDetails.values.selectedIndex
  );
  const selectData = data.find((data) => data.id === selectedIndex);
  const flagArray = useSelector((state) => state.winnerDetails.values.spendDetails);
  const flag=flagArray.find(data=>data.month===name);
  return (
    <>
      {!flag ? (
        <div className="selectButton">
          <h3>{name}'s Spend</h3>
          <input
            type="text"
            placeholder="INR 1000"
            onChange={(e) => setSpend(e.target.value)}
          />
          <button
            onClick={() =>
              dispatch(winnerAction.addSpend({ month: name, data: spend }))
            }
          >
            Submit
          </button>
        </div>
      ) : (
        <>
          <div className="selectHeader">
            <h3>Select {name}'s Winner</h3>
          </div>
          <div className="selectContainer">
            <img
              src={selectData.data}
              alt={selectedIndex}
              className="selectImage"
              onClick={() =>
                dispatch(
                  winnerAction.selectWinner({
                    month: name,
                    data: selectData.data,
                    name: selectData.name,
                  })
                )
              }
            />
          </div>
          <div className="selectButton">
            <button
              onClick={() => dispatch(winnerAction.decreaseSelection())}
              disabled={selectedIndex === 1}
            >
              Prev
            </button>
            <button
              onClick={() => dispatch(winnerAction.increaseSelection())}
              disabled={selectedIndex === 3}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}
