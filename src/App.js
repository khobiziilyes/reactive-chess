import { useState } from 'react';
import { getColumnCode, getInitialSquares } from './helpers';
import ChessSquareComponent from './ChessSquare';

function ChessHeader() {
	return new Array(10).fill(null).map((_, i) => <td className="chess-text">{ ![0, 9].includes(i) && getColumnCode(i - 1) }</td>);
}

function App() {
	const [squares, setSquares] = useState(getInitialSquares());

	return (
		<table>
			<tbody>
				<tr>
					<ChessHeader></ChessHeader>
				</tr>

				{
					squares.map(chessRow => 
						<tr>
							<td className="chess-text">{ chessRow[0].rowId + 1 }</td>
							
							{
								chessRow.map(chessSquare => 
									ChessSquareComponent(chessSquare)
								)
							}

							<td className="chess-text">{ chessRow[0].rowId + 1 }</td>
						</tr>
					)
				}

				<tr>
					<ChessHeader></ChessHeader>
				</tr>
			</tbody>
		</table>
	);
}

export default App;