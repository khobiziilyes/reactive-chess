import { areSquaresEqual } from "../helpers";

export default function setIsHighlighted(state, chessSquare) {
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