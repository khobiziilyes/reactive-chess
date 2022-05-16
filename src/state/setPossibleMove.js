import { current } from "@reduxjs/toolkit";
import { getPossibleMove, willKingBeSafe } from "../LegalMoves";

export default function setPossibleMove(state) {
    const { squares, highlightedSquare } = state;
    const realHighlightedSquare = highlightedSquare && state.squares[highlightedSquare.rowId][highlightedSquare.columnId];

    squares.flatMap(_ => _).forEach(square => {
        const possibleMove = realHighlightedSquare && getPossibleMove(realHighlightedSquare, square, squares);
        square.possibleMove = possibleMove;

        if (!possibleMove) return;

        const fromSquare = current(realHighlightedSquare);
        const toSquare = current(square);
        const currentSquares = current(squares);

        square.possibleMove = willKingBeSafe(fromSquare, toSquare, currentSquares);
    });
}