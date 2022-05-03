import { getColumnCode } from './helpers';

export class ChessSquare {
	constructor(rowId, columnId) {
		this.rowId = rowId;
		this.columnId = columnId;
		this.columnCode = getColumnCode(columnId);
		this.piece = null;
	}

	setPiece(piece) {
		this.piece = piece;
	}

	up() {
		return new ChessSquare(this.rowId + 1, this.columnId);
	}

	down() {
		return new ChessSquare(this.rowId - 1, this.columnId);
	}

	right() {
		return new ChessSquare(this.rowId, this.columnId + 1);
	}

	left() {
		return new ChessSquare(this.rowId, this.columnId - 1);
	}
}

function getSquareContent(piece) {	
	return piece && <img
		src={`piecesSvg/${piece.isLightColor ? 'light' : 'dark'}/${piece.svgName}.svg`}
		alt=""
		className="chess-svg"
	/>
}

export default function ChessSquareComponent(chessSquare) {
	const { rowId, columnId } = chessSquare;

	if (rowId === 0 || rowId === 9) {
		if (columnId === 0 || columnId === 9) return <td></td>;
		return <td className="chess-text">{ chessSquare.columnCode }</td>;
	}

	if (columnId === 0 || columnId === 9) {
		return <td className="chess-text">{ rowId }</td>;
	}

	const color = ((rowId % 2) + columnId) % 2 ? 'light' : 'dark';

	return (
		<td className={`chess-${color}`}>
			{ getSquareContent(chessSquare.piece) }
		</td>
	);
}