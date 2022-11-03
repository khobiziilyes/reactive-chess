import { forEachSquare, isSquareAttacked } from "../helpers";

export default function setInCheck(squares) {
  forEachSquare(
    squares,
    (square) =>
      (square.inCheck =
        square.piece?.name === "king" &&
        isSquareAttacked(!square.piece.isLightColor, square, squares))
  );
}
