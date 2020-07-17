import React from 'react';
import ReactDOM from 'react-dom';

import Root from './client/Root';

import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));

// const deleteModal = document.createElement("div");
// document.body.appendChild(deleteModal);
// ReactDOM.render(<DeleteModal />, deleteModal);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
