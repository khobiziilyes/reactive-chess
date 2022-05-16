import { isSquareAttacked } from '../helpers';

export default function setInCheck(squares) {
    squares.flatMap(_ => _).forEach(square => 
        square.inCheck = square.piece?.name === 'king' && isSquareAttacked(!square.piece.isLightColor, square, squares)
    );
}