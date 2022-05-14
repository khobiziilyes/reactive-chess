import { current } from "@reduxjs/toolkit";
import { areSquaresEqual } from "../helpers";
import { getPossibleMove } from "../LegalMoves";

export default function mainReducer(state, { payload }) {
    const { type, data } = payload;

    switch (type) {
        case 'highlightSquare':
            state = setIsHighlighted(state, data);
            break;
        case 'movePiece':
            state = movePiece(state, data);
            state = setIsHighlighted(state, null);

            break;
        default:
    }

    state = setPossibleMove(state);

    return state;
}

function movePiece(state, { rowId: toRow, columnId: toColumn }) {
    const { highlightedSquare: {
            rowId: fromRow,
            columnId: fromColumn
        }
    , squares } = state;
    
    const fromSquare = squares[fromRow][fromColumn], toSquare = squares[toRow][toColumn];
    
    const { piece } = fromSquare;
    const { possibleMove } = toSquare;
    
    if (possibleMove.type === 'enPassant') state.squares[fromRow][toColumn].piece = null;
    
    state.squares[fromRow][fromColumn].piece = null;
    state.squares[toRow][toColumn].piece = {
        ...piece,
        lastMove: {
            fromSquare: { ...fromSquare },
            toSquare: { ...toSquare },
            piece: { ...piece }
        }
    };

    return state;
}

function setIsHighlighted(state, chessSquare) {
    const { highlightedSquare: oldHighlighted } = state;

    if (oldHighlighted) {
        state.squares[oldHighlighted.rowId][oldHighlighted.columnId].isHighlighted = false;
        state.highlightedSquare = null;
    }
    
    const shouldHighlight = chessSquare?.piece && !areSquaresEqual(oldHighlighted, chessSquare);
    
    if (shouldHighlight) {
        state.squares[chessSquare.rowId][chessSquare.columnId].isHighlighted = true;
        state.highlightedSquare = chessSquare;
    }

    return state;
}

function setPossibleMove(state) {
    const { squares, highlightedSquare } = state;

    state.squares = squares.map(_ => _.map(square => ({
        ...square,
        possibleMove: highlightedSquare ? getPossibleMove(highlightedSquare, square, squares) : null
    })));
}