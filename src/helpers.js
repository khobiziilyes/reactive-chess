import { ChessSquare } from "./ChessSquare";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "./Pieces";

export const getColumnCode = columnId => String.fromCharCode(97 + columnId);

export const getInitialSquares = () => {
    return Array(8).fill(null).map((_, rowId) => {        
        return Array(8).fill(null).map((_, columnId) => {
            const chessSquare = ChessSquare(rowId, columnId);
            const chessPiece = getInitialPiece(chessSquare);

            chessSquare.piece = chessPiece;

            return chessSquare;
        });
    });
}

export const getInitialPiece = chessSquare => {
    const { rowId, columnCode } = chessSquare;
    if (rowId === 2 && columnCode === 'e') return Pawn(true);

    const idx = [0, 1, 6, 7].indexOf(rowId);
    
    if (idx < 0) return null;

    const isLightColor = idx > 1;

    if ([1, 6].includes(rowId)) return Pawn(isLightColor);
    
    switch (columnCode) {
        case 'a': case 'h':
            return Rook(isLightColor);
        case 'b': case 'g':
            return Knight(isLightColor);
        case 'c': case 'f':
            return Bishop(isLightColor);
        case 'd':
            return Queen(isLightColor);
        case 'e':
            return King(isLightColor);
        default:
            return null;
    };
}

export const areSquaresEqual = (x, y) => x && y && x.rowId === y.rowId && x.columnId === y.columnId;

export const findPath = ({ rowId: fromRow, columnId: fromColumn }, { rowId: toRow, columnId: toColumn }) => {
    let rowsDiff = toRow - fromRow;
    let columnsDiff = toColumn - fromColumn;
    
    const path = [];

    while (rowsDiff || columnsDiff) {
        const rowId = toRow - rowsDiff;
        const columnId = toColumn - columnsDiff;

        const square = ChessSquare(rowId, columnId);
        
        path.push(square);

        if (rowsDiff) rowsDiff -= Math.sign(rowsDiff);
        if (columnsDiff) columnsDiff -= Math.sign(columnsDiff);
    }

    return path.slice(1);
}