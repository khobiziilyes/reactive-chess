import produce from "immer";
import { areSquaresEqual, findPath, getMoveData } from "./helpers";
import movePiece from "./state/movePiece";
import setInCheck from "./state/setInCheck";

export const willKingBeSafe = (fromSquare, toSquare, squares) => {
    const afterMove = produce(squares, draft => {
        const draftFrom = draft[fromSquare.rowId][fromSquare.columnId];
        const draftTo = draft[toSquare.rowId][toSquare.columnId];

        movePiece(draftFrom, draftTo, draft);
        setInCheck(draft);
    });

    const { isLightColor } = fromSquare.piece;
    const kingSquare = afterMove.flatMap(_ => _).find(_ => _.piece?.name === 'king' && _?.piece.isLightColor === isLightColor);

    return !kingSquare.inCheck;
}

export const getPossibleMove = (fromSquare, toSquare, squares) => {
    if (fromSquare.piece.isLightColor === toSquare.piece?.isLightColor) return false;
    if (areSquaresEqual(fromSquare, toSquare)) return false;

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
        const blockingSquare = findPath(fromSquare, toSquare).find(_ => squares[_.rowId][_.columnId].piece);
        if (blockingSquare) return null;
    }

    if (possibleMove === true) return { type: 'normal' };
    if (possibleMove === false) return null;

    return possibleMove;
}

const getPawnLegalMove = ({ rowsDiff, colsDiff, isForward }, { rowId: fromRow, piece: fromPiece }, { piece: toPiece, columnId: toColumn }, squares) => {
    if (!isForward) return false;
    
    if (colsDiff === 1 && rowsDiff === 1) {
        if (toPiece) return true;
        
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