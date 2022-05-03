import { ChessSquare } from "./ChessSquare";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "./Pieces";

export const getColumnCode = columnId => String.fromCharCode(65 + columnId);

export const getInitialSquares = () => {
    return Array(8).fill(null).map((_, i) => {
        const rowId = 7 - i;
        
        return Array(8).fill(null).map((_, columnId) => {
            const chessSquare = new ChessSquare(rowId, columnId);
            const chessPiece = getInitialPiece(chessSquare);

            chessSquare.setPiece(chessPiece);

            return chessSquare;
        });
    });
}

export const getInitialPiece = chessSquare => {
    const { rowId, columnCode } = chessSquare;
    const idx = [0, 1, 6, 7].indexOf(rowId);
    
    if (idx < 0) return null;

    const isLightColor = idx < 2;

    if ([1, 6].includes(rowId)) return new Pawn(isLightColor);
    
    switch (columnCode) {
        case 'A': case 'H':
            return new Rook(isLightColor);
        case 'B': case 'G':
            return new Knight(isLightColor);
        case 'C': case 'F':
            return new Bishop(isLightColor);
        case 'D':
            return new Queen(isLightColor);
        case 'E':
            return new King(isLightColor);
        default:
            return null;
    };
}