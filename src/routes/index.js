import Homepage from 'base/scenes/homepage';
import About from 'base/scenes/about';
import History from 'base/scenes/history';

const routes = {
  Home: {
    screen: Homepage,
    path: 'monitor/:homepage',
  },
  History: {
    screen: History,
    path: 'monitor/:history',
  },
  About: {
    screen: About,
    path: 'monitor/:about',
  },
};

export default routes;