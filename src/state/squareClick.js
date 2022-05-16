import movePiece from './movePiece';
import setIsHighlighted from './setIsHighlighted';
import setPossibleMove from './setPossibleMove';
import setInCheck from './setInCheck';

export default function squareClick(state, { payload: chessSquare }) {
    const { squares, highlightedSquare } = state;
    const isMove = highlightedSquare && chessSquare.possibleMove;

    if (isMove) {
        movePiece(highlightedSquare, chessSquare, squares);
        setIsHighlighted(state, null)
        setInCheck(squares);
    } else {
        setIsHighlighted(state, chessSquare);
    }
    
    setPossibleMove(state);

    return state;
}