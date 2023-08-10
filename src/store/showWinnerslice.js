import { createSlice } from "@reduxjs/toolkit";
const initialDate = {
  values: {
    selectWinner: [],
    selectedIndex: 2,
    winnerValue: [],
    losers: [],
    spendDetails: [],
  },
  thisMonth: "",
};
const winnerSlice = createSlice({
  name: "winnerSlice",
  initialState: initialDate,
  reducers: {
    addInitialData(state, action) {
      state.values = action.payload;
    },
    addMonth(state, action) {
      state.thisMonth = action.payload;
    },
    addSpend(state, action) {
      const temp = state.values.spendDetails.find(
        (data) => data.month === state.thisMonth
      );
      if (!temp) {
        state.values.spendDetails = [
          ...state.values.spendDetails,
          action.payload,
        ];
      }
    },
    increaseSelection(state) {
      state.values.selectedIndex = ++state.values.selectedIndex;
    },
    decreaseSelection(state) {
      state.values.selectedIndex = --state.values.selectedIndex;
    },
    selectWinner(state, action) {
      const temp = state.values.winnerValue.find(
        (data) => data.month === action.payload.month
      );
      if (!temp) {
        state.values.winnerValue = [
          ...state.values.winnerValue,
          action.payload,
        ];
        if (state.values.selectedIndex === 1) {
          state.values.losers = [
            ...state.values.losers,
            {
              month: action.payload.month,
              loserDetails: state.values.selectWinner[5].data,
              name: state.values.selectWinner[5].name,
            },
          ];
        } else if (state.values.selectedIndex === 2) {
          state.values.losers = [
            ...state.values.losers,
            {
              month: action.payload.month,
              loserDetails: state.values.selectWinner[3].data,
              name: state.values.selectWinner[3].name,
            },
          ];
        } else if (state.values.selectedIndex === 3) {
          state.values.losers = [
            ...state.values.losers,
            {
              month: action.payload.month,
              loserDetails: state.values.selectWinner[4].data,
              name: state.values.selectWinner[4].name,
            },
          ];
        }
      }
    },
  },
});

export default winnerSlice.reducer;
export const winnerAction = winnerSlice.actions;
