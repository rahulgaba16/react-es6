
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import store from './reduxStore'



const node = document.getElementById('app-node');

const render = () => {
  ReactDOM.render(
    <App/>, node
  );
}
store.subscribe(render);
render();
