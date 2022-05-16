import { getPossibleMove } from '../LegalMoves';

export default function setInCheck(squares) {
    squares.flatMap(_ => _).forEach(square => {
        const canTake = square.piece?.name === 'king' && squares.flatMap(_ => _).find(fromSquare =>
            fromSquare.piece && getPossibleMove(fromSquare, square, squares)
        );

        square.inCheck = Boolean(canTake);
    });
}