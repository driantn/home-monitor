import thunk from 'redux-thunk';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import monitorReducer, {
  MonitorState,
  MONITOR_INITIAL_STATE,
} from './monitor';

export const INITIAL_STATE = {
  monitor: MONITOR_INITIAL_STATE,
};

export type AppState = {
  monitor: MonitorState;
}

export type Action = { type?: string; payload?: Object; }
export type Dispatch = { (params: Action): any; }
export type GetState = { (): AppState; }

export default function configureStore(initialState: AppState = INITIAL_STATE) {
  const composeEnhancers = compose;
  const reducers = {
    monitor: monitorReducer,
  };

  // Build the middleware for intercepting and dispatching navigation actions
  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
}
