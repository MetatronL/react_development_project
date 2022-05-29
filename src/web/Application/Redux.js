import { combineReducers, applyMiddleware, compose, createStore } from "redux";


function emptyState(state = [], action) {
  return state;
}

export function createRootReducer()
{
    return combineReducers({
        // reducers
    });
}

export function configureStore(preloadedState) {
    const store = createStore(
        emptyState,
        preloadedState,
    //   compose(
    //     applyMiddleware(
    //       // middlewares
    //     ),
    //   ),
    );
  
    return store;
}


export function createReduxBindings()
{
    const store = configureStore(/* provide initial state if any */);

    return { store };
}