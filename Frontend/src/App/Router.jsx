import React        from 'react';
import BoardsList   from './Boards/BoardsList';
import Publish      from './Threads/Publish';
import SingleBoard  from './Boards/SingleBoard';
import SingleThread from './Threads/SingleThread';
import NotFound     from './404/NotFound';
import {
  BrowserRouter as Router, Route, Switch
}                   from 'react-router-dom';
import                   'bulma/css/bulma.css';
import                   './Assets/Styles.css';

const App = ( ) => (
  <Router>
    <Switch>
      <Route path="/"                    component={ BoardsList   } exact />
      <Route path="/publish"             component={ Publish      }       />
      <Route path="/b/:board"            component={ SingleBoard  } exact />
      <Route path="/b/:board/thread/:id" component={ SingleThread }       />
      <Route component={ NotFound } />
    </Switch>
  </Router>
);

export default App;