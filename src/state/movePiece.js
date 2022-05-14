import { getMoveData } from "../helpers";

export default function movePiece(state, { payload }) {
    const { fromSquare, toSquare } = payload;

    const { rowId: fromRow, columnId: fromColumn } = fromSquare;
    const { rowId: toRow, columnId: toColumn } = toSquare;

    if (fromSquare.piece.name === 'pawn') {
        const { rowsDiff, colsDiff } = getMoveData(fromSquare, toSquare);
        if (rowsDiff === 1 && colsDiff === 1) state.squares[fromRow][toColumn].piece = null;
    }

    const { piece } = state.squares[fromRow][fromColumn];

    state.squares[fromRow][fromColumn].piece = null;
    
    state.squares[toRow][toColumn].piece = {
        ...piece,
        lastMove: {
            fromSquare,
            toSquare
        }
    };

    state.highlightedSquare = null;
}