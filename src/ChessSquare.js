import { useDispatch, useSelector } from 'react-redux';
import { getColumnCode, isInCheck } from './helpers';
import { mainAction } from './state/store';

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
		possibleMove: null
	}
}

export default function ChessSquareComponent({ chessSquare }) {
	const { isLightColor, piece, isHighlighted, possibleMove } = chessSquare;

	const { squares } = useSelector(state => state.squares);

	const isTake = possibleMove && piece;
	const inCheck = isInCheck(chessSquare, squares);

	const color = isLightColor ? 'dark' : 'light';

	const dispatch = useDispatch();

	const handleClick = () => {
		if (possibleMove) {
			dispatch(mainAction({
				type: 'movePiece',
				data: chessSquare
			}));
		} else {
			dispatch(mainAction({
				type: 'highlightSquare',
				data: chessSquare
			}));
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
				!piece && possibleMove && <span className="chess-legal"></span>
			}
		</td>
	);
}