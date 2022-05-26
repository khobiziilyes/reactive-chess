import movePiece from './movePiece';
import setIsHighlighted from './setIsHighlighted';
import setPossibleMove from './setPossibleMove';
import setInCheck from './setInCheck';

export default function squareClick(state, { payload: chessSquareData }) {
    if (!state.highlightedSquare && chessSquareData.piece.isLightColor !== state.isLightTurn) return state;

    const { squares, highlightedSquare: highlightedSquareData } = state;

    const highlightedSquare = highlightedSquareData && squares[highlightedSquareData.rowId][highlightedSquareData.columnId];
    const chessSquare = squares[chessSquareData.rowId][chessSquareData.columnId];

    const isMove = highlightedSquare && chessSquare.possibleMove;

    if (isMove) {
        movePiece(highlightedSquare, chessSquare, squares);
        setIsHighlighted(highlightedSquare, null);
        setInCheck(squares);

        state.isLightTurn = !state.isLightTurn;
    } else {
        setIsHighlighted(highlightedSquare, chessSquare);
    }
    
    if (highlightedSquare?.isHighlighted) {
        state.highlightedSquare = highlightedSquare;
    } else if (chessSquare.isHighlighted) {
        state.highlightedSquare = chessSquare;
    } else {
        state.highlightedSquare = null;
    }

    setPossibleMove(squares, state.highlightedSquare);
    
    // TODO: Check for checkmate

    return state;
}