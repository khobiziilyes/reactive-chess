import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "redux-undo";

import ChessBoard from "./ChessBoard";

export default function App() {
  const { gameState } = useSelector((state) => state.squares.present);
  const dispatch = useDispatch();

  const onSomeDo = (isRedo) => () =>
    dispatch((isRedo ? ActionCreators.redo : ActionCreators.undo)());

  const onUndo = onSomeDo(false);
  const onRedo = onSomeDo(true);

  return (
    <div>
      <h1 style={{ color: "white" }}>State is: {gameState || "normal"}</h1>

      <div>
        <button onClick={onUndo}>Back</button>
        <button onClick={onRedo}>Forward</button>
      </div>

      <div>
        <ChessBoard></ChessBoard>
      </div>
    </div>
  );
}
