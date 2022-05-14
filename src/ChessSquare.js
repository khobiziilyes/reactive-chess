import { useDispatch, useSelector } from 'react-redux';
import { areSquaresEqual, getColumnCode, isInCheck } from './helpers';
import { isMoveLegal } from './LegalMoves';
import { highlightSquare, movePiece } from './state/store';

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
		name: columnCode + rowCode
	}
}

export default function ChessSquareComponent({ chessSquare }) {
	const { isLightColor, piece } = chessSquare;

	const { squares, highlightedSquare } = useSelector(state => state.squares);

	const isHighlighted = areSquaresEqual(chessSquare, highlightedSquare);
	const isLegal = isMoveLegal(highlightedSquare, chessSquare, squares);
	const isTake = isLegal && piece;
	const inCheck = isInCheck(chessSquare, squares);

	const color = isLightColor ? 'dark' : 'light';

	const dispatch = useDispatch();

	const handleClick = () => {
		if (isLegal) {
			dispatch(movePiece({
				fromSquare: highlightedSquare,
				toSquare: chessSquare
			}));
		} else {
			dispatch(highlightSquare(chessSquare));
		}
	}

	return (
		<td className={`chess-square ${inCheck && 'chess-check'} chess-${isTake ? 'take' : color} ${isHighlighted && 'chess-highlight'}`} onClick={handleClick}>
			{ piece && <img
				src={`piecesSvg/${piece.isLightColor ? 'light' : 'dark'}/${piece.name}.svg`}
				alt=""
				className="chess-svg"
				draggable="false" />
			}

			{
				!piece && isLegal && <span className="chess-legal"></span>
			}
		</td>
	);
}