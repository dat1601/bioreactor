// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Layout,
} from './';

export default {
  path: 'layout',
  name: 'Layout',
  childRoutes: [
    { path: 'layout', name: 'Layout', component: Layout, isIndex: true },
  ],
};
