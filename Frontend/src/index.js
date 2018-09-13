import React                 from 'react';
import ReactDOM              from 'react-dom';
import Router                from './App/Router.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( <Router />, document.getElementById( 'app' ) );
registerServiceWorker( );
