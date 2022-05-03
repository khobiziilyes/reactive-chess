export default function highlightSquare(state, action) {
    const { columnId, rowId } = action.payload;
    state[rowId][columnId].isHighlighted = true;
}