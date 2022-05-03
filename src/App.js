import { useState } from 'react';
import { getInitialSquares } from './helpers';
import ChessSquareComponent from './ChessSquare';

function App() {
	const [squares, setSquares] = useState(getInitialSquares());

	return (
		<table>
			<tbody>
				{
					squares.map(chessRow => 
						<tr>
							{
								chessRow.map(chessSquare => 
									ChessSquareComponent(chessSquare)
								)
							}
						</tr>
					)
				}
			</tbody>
		</table>
	);
}

export default App;