export default function movePiece({ rowId: fromRow, columnId: fromColumn }, { rowId: toRow, columnId: toColumn }, squares) {
    const fromSquare = squares[fromRow][fromColumn], toSquare = squares[toRow][toColumn];
    
    const { piece } = fromSquare;
    const { possibleMove } = toSquare;
    
    if (possibleMove.type === 'enPassant') squares[fromRow][toColumn].piece = null;
    
    /* piece.lastMove = {
        fromSquare: { ...fromSquare, piece: null },
        toSquare: { ...toSquare, piece: null }
    } */

    squares[fromRow][fromColumn].piece = null;
    squares[toRow][toColumn].piece = piece;
}