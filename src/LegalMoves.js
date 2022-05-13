import { findPath } from "./helpers";

export const isMoveLegal = (fromSquare, toSquare, squares) => {    
    if (!fromSquare) return false;
    if (fromSquare.piece.isLightColor === toSquare.piece?.isLightColor) return false;

    const { rowId: newRowId, columnId: newColumnId } = toSquare;
    const { rowId, columnId } = fromSquare;

    const diffs = {
        rowsDiff: Math.abs(rowId - newRowId),
        colsDiff: Math.abs(columnId - newColumnId),
        isForward: (newRowId - rowId) * (fromSquare.piece.isLightColor ? 1 : -1) < 0
    }

    const isInMovingRange = (() => {
        switch (fromSquare.piece.name) {
            case 'pawn':
                return isPawnMoveLegal(diffs, fromSquare, toSquare, squares);
            case 'rook':
                return isRookMoveLegal(diffs, fromSquare, toSquare, squares);
            case 'bishop':
                return isBishopMoveLegal(diffs, fromSquare, toSquare, squares);
            case 'knight':
                return isKnightMoveLegal(diffs, fromSquare, toSquare, squares);
            case 'king':
                return isKingMoveLegal(diffs, fromSquare, toSquare, squares);
            case 'queen':
                return isQueenMoveLegal(diffs, fromSquare, toSquare, squares);
            default:
                return false;
        }
    })();

    if (!isInMovingRange) return false;

    if (fromSquare.piece.name !== 'knight') {
        const movePath = findPath(fromSquare, toSquare);
        const fromSquares = movePath.map(_ => squares[_.rowId][_.columnId]);
        
        if (fromSquares.find(_ => _.piece)) return false;
    }

    return true;
}

const isPawnMoveLegal = ({ rowsDiff, colsDiff, isForward }, { rowId }, { piece }) => {
    if (!isForward) return false;
    
    if (piece) {
        return isForward && colsDiff === 1 && rowsDiff === 1;
    } else {
        const neverMoved = [1, 6].includes(rowId);
        const maxDiff = neverMoved ? 2 : 1;

        return !colsDiff && rowsDiff <= maxDiff;
    }
}

const isRookMoveLegal = ({ rowsDiff, colsDiff }) => {
    return !colsDiff || !rowsDiff;
}

const isBishopMoveLegal = ({ rowsDiff, colsDiff }) => {
    return colsDiff === rowsDiff;
}

const isKnightMoveLegal = ({ rowsDiff, colsDiff }) => {
    return (colsDiff === 2 && rowsDiff === 1) || (rowsDiff === 2 && colsDiff === 1);
}

const isKingMoveLegal = ({ rowsDiff, colsDiff }) => {
    return colsDiff <= 1 && rowsDiff <= 1;
}

const isQueenMoveLegal = (...args) => {
    return isRookMoveLegal(...args) || isBishopMoveLegal(...args);
}