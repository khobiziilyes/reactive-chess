import { configureStore, createSlice } from "@reduxjs/toolkit";
import undoable from "redux-undo";

import { getInitialPlayerState, getInitialSquares } from "../helpers";
import squareClickReducer from "./squareClick";

export const squaresSlice = createSlice({
    name: 'squares',
    initialState: {
        squares: getInitialSquares(),
        highlightedSquare: null,
        players: [getInitialPlayerState(true), getInitialPlayerState(false)],
        isLightTurn: true
    },
    reducers: {
        squareClick: squareClickReducer
    }
});

const squareClick = squaresSlice.reducer;

export const store = configureStore({
    reducer: {
        squares: undoable(squareClick, {
            filter: (...[,,previousHistory]) => !!previousHistory.present.highlightedSquare
        })
    }
})

export const { squareClick: squareClickAction } = squaresSlice.actions;