import { configureStore, createSlice } from "@reduxjs/toolkit";

import { getInitialSquares } from "../helpers";
import movePieceFunc from "./movePiece";
import highlightSquareFunc from './highlightSquare';

export const squaresSlice = createSlice({
    name: 'squares',
    initialState: getInitialSquares(),
    reducers: {
        movePiece: movePieceFunc,
        highlightSquare: highlightSquareFunc
    }
});

const reducer = squaresSlice.reducer;

export const store = configureStore({
    reducer: {
        squares: reducer
    }
})

export const { movePiece, highlightSquare } = squaresSlice.actions;