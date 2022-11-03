export default function movePiece(fromSquare, toSquare, squares) {
  const { piece, rowId: fromRow } = fromSquare;
  const { possibleMove, columnId: toColumn } = toSquare;

  piece.lastMove = {
    fromSquare: { ...fromSquare, piece: null },
    toSquare: { ...toSquare, piece: null },
  };

  if (possibleMove.type === "enPassant") {
    squares[fromRow][toColumn].piece = null;
  }

  if (possibleMove.type === "castling") {
    const { rookRow, rookColumn, isShortCastle } = possibleMove;

    const rookSquare = squares[rookRow][rookColumn];
    const theRook = rookSquare.piece;
    const newRookSquare =
      squares[rookRow][rookColumn + (isShortCastle ? -2 : 3)];

    rookSquare.piece = null;
    newRookSquare.piece = theRook;

    theRook.lastMove = {
      fromSquare: { ...rookSquare, piece: null },
      toSquare: { ...newRookSquare, piece: null },
    };
  }

  if (piece.name === "pawn" && [0, 7].includes(toSquare.rowId))
    piece.name = "queen";

  fromSquare.piece = null;
  toSquare.piece = piece;
}
