import { useSelector } from 'react-redux';

import ChessSquareComponent from './ChessSquare';
import ChessHeader from './ChessHeader';

export default function ChessBoard() {
	const { squares, isLightTurn } = useSelector(state => state.squares.present);
	
	// Use this in case you wanna enable autoflip
	// const finalSquares = isLightTurn ? squares : [...squares].map(_ => [..._].reverse()).reverse();

	const finalSquares = squares;
	
	return (
		<table>
			<tbody>
				<tr>
					<ChessHeader></ChessHeader>
				</tr>

				{
					finalSquares.map(chessRow => 
						<tr key={`tr-${chessRow[0].rowId}`}>
							<td className="chess-text">{ chessRow[0].rowCode } - { chessRow[0].rowId }</td>
							
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