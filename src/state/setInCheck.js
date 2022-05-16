import { current } from '@reduxjs/toolkit';
import { getPossibleMove } from '../LegalMoves';

export default function setInCheck(squares) {
    squares.flatMap(_ => _).forEach(chessSquare => {
        const canTake = !!squares.flatMap(_ => _).find(_ =>
            _.piece && getPossibleMove(_, chessSquare, squares)
        );

        // const x = current(chessSquare);

        chessSquare.inCheck = chessSquare.piece?.name === 'king' && canTake;
    });
}