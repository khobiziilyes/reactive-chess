import ChessRow from './ChessRow';

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