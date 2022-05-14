import { findPath, getMoveData } from "./helpers";

export const getPossibleMove = (fromSquare, toSquare, squares) => {    
    if (!fromSquare) return false;
    if (fromSquare.piece.isLightColor === toSquare.piece?.isLightColor) return false;

    const moveData = getMoveData(fromSquare, toSquare, fromSquare.piece);

    const possibleMove = (() => {
        switch (fromSquare.piece.name) {
            case 'pawn':
                return getPawnLegalMove(moveData, fromSquare, toSquare, squares);
            case 'rook':
                return isRookMoveLegal(moveData, fromSquare, toSquare, squares);
            case 'bishop':
                return isBishopMoveLegal(moveData, fromSquare, toSquare, squares);
            case 'knight':
                return isKnightMoveLegal(moveData, fromSquare, toSquare, squares);
            case 'king':
                return isKingMoveLegal(moveData, fromSquare, toSquare, squares);
            case 'queen':
                return isQueenMoveLegal(moveData, fromSquare, toSquare, squares);
            default:
                return null;
        }
    })();

    if (!possibleMove) return null;

    // Remove blocked paths
    if (fromSquare.piece.name !== 'knight') {
        const movePath = findPath(fromSquare, toSquare).map(_ => squares[_.rowId][_.columnId]);
        if (movePath.find(_ => _.piece)) return null;
    }

    if (possibleMove === true) return { type: 'normal' };
    if (possibleMove === false) return null;

    return possibleMove;
}

const getPawnLegalMove = ({ rowsDiff, colsDiff, isForward }, { rowId: fromRow, piece: fromPiece }, { piece: toPiece, columnId: toColumn }, squares) => {
    if (!isForward) return false;
    
    if (colsDiff === 1 && rowsDiff === 1) {
        if (toPiece) return true
        
        const { piece: enPassantPiece } = squares[fromRow][toColumn];

        if (enPassantPiece?.lastMove) {
            const { name, lastMove: { fromSquare, toSquare } } = enPassantPiece;
            
            if (name === 'pawn' && getMoveData(fromSquare, toSquare, fromPiece).rowsDiff === 2) return {
                type: 'enPassant'
            };
        }
    }
    
    const neverMoved = !fromPiece.lastMove;
    const maxDiff = neverMoved ? 2 : 1;

    return !colsDiff && rowsDiff <= maxDiff && !toPiece;
}

const isRookMoveLegal = ({ rowsDiff, colsDiff }) => !colsDiff || !rowsDiff;
const isBishopMoveLegal = ({ rowsDiff, colsDiff }) => colsDiff === rowsDiff;
const isKnightMoveLegal = ({ rowsDiff, colsDiff }) => (colsDiff === 2 && rowsDiff === 1) || (rowsDiff === 2 && colsDiff === 1);
const isKingMoveLegal = ({ rowsDiff, colsDiff }) => colsDiff <= 1 && rowsDiff <= 1;
const isQueenMoveLegal = (...args) => isRookMoveLegal(...args) || isBishopMoveLegal(...args);