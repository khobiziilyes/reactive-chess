export default function highlightSquare(state, action) {
    return (!state && action.payload.piece && action.payload) || null;
}