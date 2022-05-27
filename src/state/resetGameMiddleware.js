import { resetState } from "./store";

const resetGameMiddleware = storeAPI => next => action => {
    next(action);

    if (action.type === 'squares/squareClick') {
        const state = storeAPI.getState().squares.present;
        
        if (state.gameState) {
            setTimeout(() => 
                storeAPI.dispatch(resetState())
            , 3000);
        }
    }
}

export default resetGameMiddleware;