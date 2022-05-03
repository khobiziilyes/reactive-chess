const getColumnCode = columnId => String.fromCharCode(64 + columnId);

function getSquareContent(rowId, columnId) {
	const showImg = [1, 2, 7, 8].includes(rowId);

	return showImg && <img
		src="piecesSvg/king.svg"
		alt=""
		className="chess-svg"
	/>
}

function ChessSquare(rowId, columnId) {
	if (rowId === 0 || rowId === 9) {
		if (columnId === 0 || columnId === 9) return <td></td>;
		return <td className="chess-text">{ getColumnCode(columnId) }</td>;
	}

	if (columnId === 0 || columnId === 9) {
		return <td className="chess-text">{ rowId }</td>;
	}

	const color = ((rowId % 2) + columnId) % 2 ? 'white' : 'black';
	

	return (
		<td className={`chess-${color}`}>
			{ getSquareContent(rowId, columnId) }
		</td>
	);
}

function ChessRow(rowId) {
	return (
		<tr>
			{
				Array(10).fill(null).map((_, i) => ChessSquare(rowId, i))
			}
		</tr>
	);
}

function App() {
	return (
		<table>
			<tbody>
				{
					Array(10).fill(null).map((_, i) => ChessRow(9 - i))
				}
			</tbody>
		</table>
	);
}

export default App;