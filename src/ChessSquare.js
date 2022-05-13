import { useDispatch, useSelector } from 'react-redux';
import { areSquaresEqual, getColumnCode } from './helpers';
import { isMoveLegal } from './LegalMoves';
import { highlightSquare, movePiece } from './state/store';

export function ChessSquare(rowId, columnId) {
	return {
		rowId,
		columnId,
		columnCode: getColumnCode(columnId),
		piece: null,
		isLightColor: ((rowId % 2) + columnId) % 2 === 1
	}
}

export default function ChessSquareComponent({ chessSquare }) {
	const { isLightColor, piece } = chessSquare;

	const highlightedSquare = useSelector(state => state.highlightedSquare);
	const squares = useSelector(state => state.squares);

	const isHighlighted = areSquaresEqual(chessSquare, highlightedSquare);
	const isLegal = isMoveLegal(highlightedSquare, chessSquare, squares);
	const isTake = isLegal && piece;

	const color = isLightColor ? 'dark' : 'light';

	const dispatch = useDispatch();

	const handleClick = () => {
		if (isTake) {
			// dispatch(takePiece(chessSquare));
		} else if (isLegal) {
			dispatch(movePiece(chessSquare));
		} else {
			dispatch(highlightSquare(chessSquare));
		}
	}

	return (
		<td className={`chess-square chess-${isTake ? 'take' : color} ${isHighlighted && 'chess-highlight'}`} onClick={handleClick}>
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