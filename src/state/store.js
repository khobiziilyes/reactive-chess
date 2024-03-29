import { configureStore, createSlice } from "@reduxjs/toolkit";
import undoable from "redux-undo";

import { getInitialSquares } from "../helpers";
import squareClickReducer from "./squareClick";
import resetGameMiddleware from "./resetGameMiddleware";

export const initialState = {
  squares: getInitialSquares(),
  highlightedSquare: null,
  isLightTurn: true,
  gameState: null,
};

const resetStateReducer = () => initialState;

export const squaresSlice = createSlice({
  name: "squares",
  initialState,
  reducers: {
    squareClick: squareClickReducer,
    resetState: resetStateReducer,
  },
});

const squareClick = squaresSlice.reducer;

export const store = configureStore({
  reducer: {
    squares: undoable(squareClick, {
      filter: (action) => action.payload?.possibleMove,
    }),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(resetGameMiddleware),
});

export const { squareClick: squareClickAction, resetState } =
  squaresSlice.actions;
