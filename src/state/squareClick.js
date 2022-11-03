import movePiece from "./movePiece";
import setIsHighlighted from "./setIsHighlighted";
import setPossibleMove from "./setPossibleMove";
import setInCheck from "./setInCheck";
import setWhoWon from "./setWhoWon";

export default function squareClick(state, { payload: chessSquareData }) {
  const { squares, highlightedSquare: highlightedSquareData } = state;

  const highlightedSquare =
    highlightedSquareData &&
    squares[highlightedSquareData.rowId][highlightedSquareData.columnId];
  const chessSquare = squares[chessSquareData.rowId][chessSquareData.columnId];

  const isMove = highlightedSquare && chessSquare.possibleMove;
  const isLightColor = highlightedSquare?.piece.isLightColor;

  if (
    !state.highlightedSquare &&
    chessSquare.piece.isLightColor !== state.isLightTurn
  )
    return;
  if (
    !isMove &&
    state.highlightedSquare &&
    chessSquare.piece?.isLightColor !== state.isLightTurn
  )
    return;

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
  if (isMove) setWhoWon(state, isLightColor);

  return state;
}
