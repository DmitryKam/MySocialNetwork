import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './redux/redux-store';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import SamuraiJSApp from './App';



    ReactDOM.render(<SamuraiJSApp />, document.getElementById('root'));

//renderTree();




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
