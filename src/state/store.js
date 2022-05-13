import { configureStore, createSlice } from "@reduxjs/toolkit";

import { getInitialSquares } from "../helpers";
import movePieceFunc from "./movePiece";
import highlightSquareFunc from './highlightSquare';

export const squaresSlice = createSlice({
    name: 'squares',
    initialState: getInitialSquares(),
    reducers: {
        movePiece: movePieceFunc
    }
});

export const highlightedSquareSlice = createSlice({
    name: 'highlightedSquare',
    initialState: null,
    reducers: {
        highlightSquare: highlightSquareFunc
    }
})

const squaresReducer = squaresSlice.reducer;
const highlightedSquareReducer = highlightedSquareSlice.reducer;

export const store = configureStore({
    reducer: {
        squares: squaresReducer,
        highlightedSquare: highlightedSquareReducer
    }
})

export const { movePiece } = squaresSlice.actions;
export const { highlightSquare } = highlightedSquareSlice.actions;