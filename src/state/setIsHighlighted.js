import { areSquaresEqual } from "../helpers";

export default function setIsHighlighted(currentHighlighted, chessSquare) {
    if (currentHighlighted) currentHighlighted.isHighlighted = false;
    
    const shouldHighlight = chessSquare?.piece && !areSquaresEqual(currentHighlighted, chessSquare);
    
    if (shouldHighlight) chessSquare.isHighlighted = true;
}