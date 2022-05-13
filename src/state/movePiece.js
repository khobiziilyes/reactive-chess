import { getMoveData } from "../helpers";

export default function movePiece(state, { payload }) {
    const { fromSquare, toSquare } = payload;

    const { rowId: fromRow, columnId: fromColumn } = fromSquare;
    const { rowId: toRow, columnId: toColumn } = toSquare;

    if (fromSquare.piece.name === 'pawn') {
        const { rowsDiff, colsDiff } = getMoveData(fromSquare, toSquare);
        
        if (rowsDiff === 1 && colsDiff === 1) {
            state[fromRow][toColumn].piece = null;
        }
    }

    const { piece } = state[fromRow][fromColumn];

    state[fromRow][fromColumn].piece = null;
    
    state[toRow][toColumn].piece = {
        ...piece,
        lastMove: {
            fromSquare,
            toSquare
        }
    };
}