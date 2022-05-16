import { configureStore, createSlice } from "@reduxjs/toolkit";

import { getInitialPlayerState, getInitialSquares } from "../helpers";
import squareClickReducer from "./squareClick";

export const squaresSlice = createSlice({
    name: 'squares',
    initialState: {
        squares: getInitialSquares(),
        highlightedSquare: null,
        players: [getInitialPlayerState(true), getInitialPlayerState(false)]
    },
    reducers: {
        squareClick: squareClickReducer
    }
});

const squareClick = squaresSlice.reducer;

export const store = configureStore({
    reducer: {
        squares: squareClick
    }
})

export const { squareClick: squareClickAction } = squaresSlice.actions;