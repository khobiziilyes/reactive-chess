import produce from "immer";
import {
  areSquaresEqual,
  findPath,
  findSquare,
  getMoveData,
  isMoveBlocked,
  isPathBlocked,
  isSquareAttacked,
} from "./helpers";
import movePiece from "./state/movePiece";
import setInCheck from "./state/setInCheck";

export const willKingBeSafe = (fromSquare, toSquare, squares) => {
  const afterMove = produce(squares, (draft) => {
    const draftFrom = draft[fromSquare.rowId][fromSquare.columnId];
    const draftTo = draft[toSquare.rowId][toSquare.columnId];

    movePiece(draftFrom, draftTo, draft);
    setInCheck(draft);
  });

  const { isLightColor } = fromSquare.piece;
  const kingSquare = findSquare(
    afterMove,
    (_) => _.piece?.name === "king" && _?.piece.isLightColor === isLightColor
  );

  return !kingSquare.inCheck;
};

export const getPossibleMove = (fromSquare, toSquare, squares) => {
  if (!fromSquare.piece) return false;
  if (fromSquare.piece.isLightColor === toSquare.piece?.isLightColor)
    return false;
  if (areSquaresEqual(fromSquare, toSquare)) return false;

  const moveData = getMoveData(fromSquare, toSquare, fromSquare.piece);

  const possibleMove = (() => {
    switch (fromSquare.piece.name) {
      case "pawn":
        return getPawnLegalMove(moveData, fromSquare, toSquare, squares);
      case "rook":
        return isRookMoveLegal(moveData, fromSquare, toSquare, squares);
      case "bishop":
        return isBishopMoveLegal(moveData, fromSquare, toSquare, squares);
      case "knight":
        return isKnightMoveLegal(moveData, fromSquare, toSquare, squares);
      case "king":
        return isKingMoveLegal(moveData, fromSquare, toSquare, squares);
      case "queen":
        return isQueenMoveLegal(moveData, fromSquare, toSquare, squares);
      default:
        return null;
    }
  })();

  if (!possibleMove) return null;

  const blockedPath = isMoveBlocked(
    fromSquare,
    toSquare,
    squares,
    fromSquare.piece.name
  );
  if (blockedPath) return null;

  if (possibleMove === true) return { type: "normal" };
  if (possibleMove === false) return null;

  return possibleMove;
};

const getPawnLegalMove = (
  { rowsDiff, colsDiff, isForward },
  { rowId: fromRow, piece },
  { piece: toPiece, columnId: toColumn },
  squares
) => {
  if (!isForward) return false;

  if (colsDiff === 1 && rowsDiff === 1) {
    if (toPiece) return true;

    const { piece: enPassantPiece } = squares[fromRow][toColumn];

    if (enPassantPiece?.lastMove) {
      const {
        name,
        lastMove: { fromSquare, toSquare },
      } = enPassantPiece;

      if (
        name === "pawn" &&
        getMoveData(fromSquare, toSquare, piece).rowsDiff === 2
      )
        return {
          type: "enPassant",
        };
    }
  }

  const neverMoved = !piece.lastMove;
  const maxDiff = neverMoved ? 2 : 1;

  return !colsDiff && rowsDiff <= maxDiff && !toPiece;
};

const isKingMoveLegal = (
  { rowsDiff, colsDiff },
  fromSquare,
  toSquare,
  squares
) => {
  if (colsDiff <= 1 && rowsDiff <= 1) return true;

  const { piece } = fromSquare;
  const { isLightColor } = piece;
  const { rowId: toRow, columnId: toColumn } = toSquare;

  if (piece.lastMove) return false;
  if (fromSquare.inCheck) return false;

  const firstRow = piece.isLightColor ? 7 : 0;
  if (toRow !== firstRow) return false;

  const isCastleSquare = toColumn === 2 || toColumn === 6;
  if (!isCastleSquare) return false;

  const isShortCastle = toColumn === 6;
  const rookSquare = squares[firstRow][isShortCastle ? 7 : 0];

  if (!rookSquare.piece) return false;
  if (rookSquare.piece.lastMove) return false;

  const path = findPath(fromSquare, rookSquare);

  const isBlocked = isPathBlocked(path, squares);
  if (isBlocked) return false;

  const attackedSquare = path.find((_) =>
    isSquareAttacked(!isLightColor, _, squares)
  );
  if (attackedSquare) return false;

  return {
    type: "castling",
    rookRow: rookSquare.rowId,
    rookColumn: rookSquare.columnId,
    isShortCastle,
  };
};

const isRookMoveLegal = ({ rowsDiff, colsDiff }) => !colsDiff || !rowsDiff;
const isBishopMoveLegal = ({ rowsDiff, colsDiff }) => colsDiff === rowsDiff;
const isKnightMoveLegal = ({ rowsDiff, colsDiff }) =>
  (colsDiff === 2 && rowsDiff === 1) || (rowsDiff === 2 && colsDiff === 1);
const isQueenMoveLegal = (...args) =>
  isRookMoveLegal(...args) || isBishopMoveLegal(...args);
