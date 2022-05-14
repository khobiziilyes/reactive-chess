import { configureStore, createSlice } from "@reduxjs/toolkit";

import { getInitialSquares } from "../helpers";
import movePieceFunc from "./movePiece";
import highlightSquareFunc from './highlightSquare';

export const squaresSlice = createSlice({
    name: 'squares',
    initialState: {
        squares: getInitialSquares(),
        highlightedSquare: null
    },
    reducers: {
        movePiece: movePieceFunc,
        highlightSquare: highlightSquareFunc
    }
});

const squaresReducer = squaresSlice.reducer;

export const store = configureStore({
    reducer: {
        squares: squaresReducer
    }
})

export const { movePiece, highlightSquare } = squaresSlice.actions;