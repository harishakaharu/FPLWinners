import { useDispatch, useSelector } from "react-redux";
import SelectWinner from "./container/SelectWinner";
import ShowWinnerLosers from "./container/ShowWinnerLosers";
import contract from "./contract/index";
import "./index.css";
import { useEffect, useState } from "react";
import { winnerAction } from "./store/showWinnerslice";
import HistoricalList from "./container/HistoricalList";
import SpendList from "./container/SpendList";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
const firebaseConfig = {
  apiKey: "AIzaSyAQHcTLmMIvoQJz5mnViNnMp-gw7fRV9e4",
  databaseURL: "https://reacttesting-f34e5-default-rtdb.firebaseio.com",
  projectId: "reacttesting-f34e5",
  messagingSenderId: "reacttesting-f34e5",
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
function App() {
  const [initial, setInitail] = useState(false);
  const [initial1, setInitail1] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = () => {
      const rootRef = database.ref();
      const usersRef = rootRef.child("selectWinner");
      const usersRef1 = rootRef.child("selectedIndex");
      const usersRef2 = rootRef.child("winnerValue");
      const usersRef3 = rootRef.child("losers");
      const usersRef4 = rootRef.child("spendDetails");
      usersRef.once("value").then((snapshot) => {
        const val = snapshot.val() || [];
        setData({ selectWinner: val });
      });
      usersRef1.once("value").then((snapshot) => {
        const val = snapshot.val();
        setData((prev) => ({ ...prev, selectedIndex: val }));
      });
      usersRef2.once("value").then((snapshot) => {
        const val = snapshot.val() || [];
        if (val === "") {
          setData((prev) => ({ ...prev, winnerValue: [] }));
        } else setData((prev) => ({ ...prev, winnerValue: val }));
      });
      usersRef3.once("value").then((snapshot) => {
        const val = snapshot.val() || [];
        if (val === "") {
          setData((prev) => ({ ...prev, losers: [] }));
        } else {
          setData((prev) => ({ ...prev, losers: val }));
        }
      });
      usersRef4.once("value").then((snapshot) => {
        const val = snapshot.val() || [];
        if (val === "") {
          setData((prev) => ({ ...prev, spendDetails: [] }));
        } else {
          setData((prev) => ({ ...prev, spendDetails: val }));
        }
        setInitail(true);
      });
    };
    getData();
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date();
    let name = month[d.getMonth()];
    dispatch(winnerAction.addMonth(name));
  }, []);
  useEffect(() => {
    if (initial) {
      dispatch(winnerAction.addInitialData(data));
      setInitail1(true);
    }
  }, [initial]);
  const flag = useSelector((state) => state.winnerDetails.values.winnerValue);
  const contractHandler = () => {
    window.open(contract);
  };
  return (
    <>
      <div className="main_header">
        <h1> FPL Winners and Losers</h1>
        <button onClick={contractHandler}>Contract Details</button>
      </div>

      {initial1 && (
        <>
          {!flag.length ? <SelectWinner /> : <ShowWinnerLosers />}
          <HistoricalList />
          <SpendList />
        </>
      )}
    </>
  );
}

export default App;
