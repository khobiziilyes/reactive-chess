import ChessSquareComponent from './ChessSquare';
import ChessHeader from './ChessHeader';

import { useSelector } from 'react-redux';
import { findPath } from './helpers';
import { useEffect } from 'react';

function App() {
	const squares = useSelector(state => state.squares);

	useEffect(() => {
		const those = findPath(squares[7][3], squares[4][0]);
		console.log(those);
	});

	return (
		<table>
			<tbody>
				<tr>
					<ChessHeader></ChessHeader>
				</tr>

				{
					squares.map(chessRow => 
						<tr key={`tr-${chessRow[0].rowId}`}>
							<td className="chess-text">{ 8 - chessRow[0].rowId } - { chessRow[0].rowId }</td>
							
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