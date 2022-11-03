import produce from "immer";
import { filterSquares, findSquare, flatSquares } from "../helpers";
import setPossibleMove from "./setPossibleMove";

export default function setWhoWon(state, lastMoverIsLight) {
  const { squares } = state;

  const afterPossible = produce(squares, (draft) => {
    const oppositeSquares = filterSquares(
      draft,
      (_) => _.piece?.isLightColor === !lastMoverIsLight
    );

    for (let oppositeSquare of oppositeSquares) {
      setPossibleMove(draft, oppositeSquare);
      const possible = flatSquares(draft).find((_) => _.possibleMove);

      if (possible) break;
    }
  });

  const possible = findSquare(afterPossible, (_) => _.possibleMove);
  if (possible) return;

  // There is no possible move for the opposite player.

  const oppositeKing = findSquare(
    squares,
    (_) =>
      _.piece?.isLightColor === !lastMoverIsLight && _.piece.name === "king"
  );
  const loser = lastMoverIsLight ? "Black" : "White";

  if (oppositeKing.inCheck) {
    // Checkmate
    state.gameState = `${loser} lost the game.`;
  } else {
    // Stalemate
    state.gameState = `${loser} is stale`;
  }
}
