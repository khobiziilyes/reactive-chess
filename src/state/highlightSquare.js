export default function highlightSquare(state, action) {
    state.highlightedSquare = (!state.highlightedSquare && action.payload.piece && action.payload) || null;
}