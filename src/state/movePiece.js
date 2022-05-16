export default function movePiece(fromSquare, toSquare, squares) {    
    const { piece, rowId: fromRow} = fromSquare;
    const { possibleMove, columnId: toColumn } = toSquare;
    
    if (possibleMove.type === 'enPassant') squares[fromRow][toColumn].piece = null;
    
    /* piece.lastMove = {
        fromSquare: { ...fromSquare, piece: null },
        toSquare: { ...toSquare, piece: null }
    } */

    fromSquare.piece = null;
    toSquare.piece = piece;
}