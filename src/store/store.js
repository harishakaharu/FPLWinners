import { configureStore } from "@reduxjs/toolkit";
import showWinnerslice from "./showWinnerslice";
const store = configureStore({
  reducer: {winnerDetails:showWinnerslice},
});

export default store;
