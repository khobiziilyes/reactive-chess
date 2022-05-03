import { useDispatch } from 'react-redux';
import { getColumnCode } from './helpers';
import { highlightSquare } from './state/store';

export function ChessSquare(rowId, columnId) {
	return {
		rowId,
		columnId,
		columnCode: getColumnCode(columnId),
		piece: null,
		isHighlighted: false,
		isLightColor: ((rowId % 2) + columnId) % 2 === 1
	}
}

function getSquareContent(piece) {	
	return piece && <img
		src={`piecesSvg/${piece.isLightColor ? 'light' : 'dark'}/${piece.svgName}.svg`}
		alt=""
		className="chess-svg"
	/>
}

export default function ChessSquareComponent({ chessSquare }) {
	const { rowId, columnId, isHighlighted, isLightColor } = chessSquare;
	const color = isLightColor ? 'dark' : 'light';

	const dispatch = useDispatch();

	return (
		<td className={`chess-${color} ${isHighlighted && 'chess-highlight'}`} onClick={() => dispatch(highlightSquare(chessSquare))}>
			{ getSquareContent(chessSquare.piece) }
		</td>
	);
}