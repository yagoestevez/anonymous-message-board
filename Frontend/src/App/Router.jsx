import React       from 'react';
import BoardsList  from './Boards/BoardsList';
import Publish     from './Threads/Publish';
import SingleBoard from './Boards/SingleBoard';
import {
  BrowserRouter as Router, Route
}                  from "react-router-dom";
import                  'bulma/css/bulma.css';
import                  './Styles.css';

const App = ( ) => (
  <Router>
    <React.Fragment>
      <Route path="/"         component={ BoardsList  } exact />
      <Route path="/publish"  component={ Publish     }       />
      <Route path="/b/:board" component={ SingleBoard }       />
    </React.Fragment>
  </Router>
);

export default App;
