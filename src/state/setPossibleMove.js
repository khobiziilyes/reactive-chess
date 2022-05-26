import { current } from "@reduxjs/toolkit";
import { forEachSquare } from "../helpers";
import { getPossibleMove, willKingBeSafe } from "../LegalMoves";

export default function setPossibleMove(squares, highlightedSquare) {
    forEachSquare(squares, square => {
        const possibleMove = highlightedSquare && getPossibleMove(highlightedSquare, square, squares);
        square.possibleMove = possibleMove;

        if (!possibleMove) return;

        // Check if the king is safe if the move is made.

        const fromSquare = current(highlightedSquare);
        const toSquare = current(square)
        const currentSquares = current(squares);

        const safeMove = willKingBeSafe(fromSquare, toSquare, currentSquares);

        if (!safeMove) square.possibleMove = null;
    });
}