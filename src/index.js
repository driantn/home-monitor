// @flow
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'base/stores';
import Routes from 'base/routes';
import { createDrawerNavigator } from 'react-navigation';

const store = configureStore();
const App = createDrawerNavigator(Routes);

const app = () => (
  <Provider store={store}>
   <App />
  </Provider>
);

export default app;
