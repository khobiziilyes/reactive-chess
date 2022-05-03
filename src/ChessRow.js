import ChessSquare from './ChessSquare';

export default function ChessRow(rowId) {
	return (
		<tr>
			{
				Array(10).fill(null).map((_, i) => ChessSquare(rowId, i))
			}
		</tr>
	);
}