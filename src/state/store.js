import { configureStore, createSlice } from "@reduxjs/toolkit";

import { getInitialPlayerState, getInitialSquares } from "../helpers";
import mainReducerFunc from "./mainAction";

export const squaresSlice = createSlice({
    name: 'squares',
    initialState: {
        squares: getInitialSquares(),
        highlightedSquare: null,
        players: [getInitialPlayerState(true), getInitialPlayerState(false)]
    },
    reducers: {
        mainReducer: mainReducerFunc
    }
});

const mainReducer = squaresSlice.reducer;

export const store = configureStore({
    reducer: {
        squares: mainReducer
    }
})

export const { mainReducer: mainAction } = squaresSlice.actions;