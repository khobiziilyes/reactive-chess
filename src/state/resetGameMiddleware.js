import { resetState } from "./store";
import { ActionCreators } from 'redux-undo';

const resetGameMiddleware = storeAPI => next => action => {
    next(action);

    if (action.type === 'squares/squareClick') {
        const state = storeAPI.getState().squares.present;
        
        if (state.gameState) {
            setTimeout(() => {
                storeAPI.dispatch(ActionCreators.clearHistory());
                storeAPI.dispatch(resetState());
            }, 5000);
        }
    }
}

export default resetGameMiddleware;