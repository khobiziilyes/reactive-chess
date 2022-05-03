import ChessSquareComponent from './ChessSquare';
import ChessHeader from './ChessHeader';

import { useSelector } from 'react-redux';

function App() {
	const squares = useSelector(state => state.squares);

	return (
		<table>
			<tbody>
				<tr>
					<ChessHeader></ChessHeader>
				</tr>

				{
					squares.map(chessRow => 
						<tr key={`tr-${chessRow[0].rowId}`}>
							<td className="chess-text">{ 8 - chessRow[0].rowId }</td>
							
							{
								chessRow.map(chessSquare => 
									<ChessSquareComponent chessSquare={chessSquare} key={`SQUARE-${chessSquare.columnCode}${chessSquare.rowId}`}></ChessSquareComponent>
								)
							}

							<td className="chess-text">{ 8 - chessRow[0].rowId }</td>
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