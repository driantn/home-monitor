/* @flow */
import firebaseDBRef from 'base/services/firebase-db-ref';
import type { Action, Dispatch, GetState } from 'base/stores';

export const MONITOR_LAST_ITEM = 'monitor/lastItem';
export const MONITOR_HISTORY = 'monitor/history';
export const MONITOR_LOADING = 'monitor/loading';

export type MonitorItem = {
  temperature: number;
  humidity: number;
  timestamp: number;
}

export type MonitorState = {
  history: Array<MonitorItem>;
  lastItem: MonitorItem;
  isLoading: boolean,
}

export const MONITOR_INITIAL_STATE = {
  lastItem: {
    temperature: 0,
    humidity: 0,
    timestamp: 0,
  },
  history: [],
  isLoading: false,
};

export default function reducer(
  state: MonitorState = MONITOR_INITIAL_STATE,
  action: Action = {},
) {
  switch (action.type) {
    case MONITOR_LOADING:
      return { ...state, ...action.payload, isLoading: true };
    case MONITOR_LAST_ITEM:
    case MONITOR_HISTORY:
      return { ...state, ...action.payload, isLoading: false };
    default:
      return state;
  }
}

// Functions to listen for firebase events
export function watchForLastEntry(): Object {
  return (dispatch: Dispatch, getState: GetState) => {
    firebaseDBRef.orderByKey().limitToLast(1).on('child_added', (snap) => {
      if (snap) {
        dispatch(monitorLastItem(snap.val()));
        dispatch(monitorHistory([...getState().monitor.history, snap.val()]));
      }
    });
  };
}

export function getMonitorHistory(): Object {
  return (dispatch: Dispatch) => {
    dispatch({ type: MONITOR_LOADING });
    firebaseDBRef.orderByKey().limitToLast(5000).once('value').then((snapshot) => {
      if (!snapshot) return null;
      const data = Object.values(snapshot.val());
      if (data) {
        dispatch(monitorHistory(data));
      }
    });
  };
}

export function monitorLastItem(item: Object) {
  return { type: MONITOR_LAST_ITEM, payload: { lastItem: item } };
}

export function monitorHistory(history: Array<Object>) {
  return { type: MONITOR_HISTORY, payload: { history } };
}