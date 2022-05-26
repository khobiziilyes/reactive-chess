import ChessSquareComponent from './ChessSquare';
import ChessHeader from './ChessHeader';

import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from "redux-undo";

function ChessBoard() {
	const { squares } = useSelector(state => state.squares.present);

	return (
		<table>
			<tbody>
				<tr>
					<ChessHeader></ChessHeader>
				</tr>

				{
					squares.map(chessRow => 
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

export default function App() {
	const dispatch = useDispatch();
	
	const onSomeDo = isRedo => () =>
		dispatch(
			(isRedo ? ActionCreators.redo : ActionCreators.undo)()
		);

	const onUndo = onSomeDo(false);
	const onRedo = onSomeDo(true);
	
	return (
		<div>
			<div>
				<button onClick={onUndo}>Back</button>
				<button onClick={onRedo}>Forward</button>
			</div>

			<div>
				<ChessBoard></ChessBoard>
			</div>
		</div>
	)
}