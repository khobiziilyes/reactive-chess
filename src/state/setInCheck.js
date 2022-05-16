import { getPossibleMove } from '../LegalMoves';

export default function setInCheck(squares) {
    squares.flatMap(_ => _).forEach(chessSquare => 
        chessSquare.inCheck =
            chessSquare.piece?.name === 'king' &&
            squares.flatMap(_ => _).find(_ =>
                _.piece && getPossibleMove(_, chessSquare, squares)
            )
    );
}