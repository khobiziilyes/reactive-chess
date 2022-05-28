import { configureStore, createSlice } from "@reduxjs/toolkit";
import undoable from "redux-undo";

import { getInitialPlayerState, getInitialSquares } from "../helpers";
import squareClickReducer from "./squareClick";
import resetGameMiddleware from './resetGameMiddleware';

const resetStateReducer = () => initialState;

export const initialState = {
    squares: getInitialSquares(),
    highlightedSquare: null,
    players: [getInitialPlayerState(true), getInitialPlayerState(false)],
    isLightTurn: true,
    gameState: null
}

export const squaresSlice = createSlice({
    name: 'squares',
    initialState,
    reducers: {
        squareClick: squareClickReducer,
        resetState: resetStateReducer
    }
});

const squareClick = squaresSlice.reducer;

export const store = configureStore({
    reducer: {
        squares: undoable(squareClick, {
            filter: action => action.payload.possibleMove
        })
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(resetGameMiddleware)
})

export const { squareClick: squareClickAction, resetState } = squaresSlice.actions;