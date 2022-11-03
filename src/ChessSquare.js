import { useDispatch } from "react-redux";
import { getColumnCode } from "./helpers";
import { squareClickAction } from "./state/store";

export function ChessSquare(rowId, columnId) {
  const columnCode = getColumnCode(columnId);
  const rowCode = 8 - rowId;

  return {
    rowId,
    columnId,
    columnCode,
    rowCode,
    piece: null,
    isLightColor: ((rowId % 2) + columnId) % 2 === 1,
    name: columnCode + rowCode,
    isHighlighted: false,
    possibleMove: null,
    inCheck: false,
  };
}

export default function ChessSquareComponent({ chessSquare }) {
  const { isLightColor, piece, isHighlighted, possibleMove, inCheck } =
    chessSquare;

  const isTake = possibleMove && piece;
  const color = isLightColor ? "dark" : "light";

  const dispatch = useDispatch();
  const handleClick = () => dispatch(squareClickAction(chessSquare));

  return (
    <td
      className={`chess-square ${inCheck && "chess-check"} chess-${
        isTake ? "take" : color
      } ${isHighlighted && "chess-highlight"}`}
      onClick={handleClick}
    >
      {piece && (
        <img
          src={`piecesSvg/${piece.isLightColor ? "light" : "dark"}/${
            piece.name
          }.svg`}
          alt=""
          className="chess-svg"
          draggable="false"
        />
      )}

      {!piece && possibleMove && <span className="chess-legal"></span>}
    </td>
  );
}
