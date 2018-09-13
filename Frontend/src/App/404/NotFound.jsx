import React    from 'react';
import Nav      from '../Utils/Nav';

const NotFound = props => {
  return (
    <React.Fragment>
      <section
        className = "hero is-danger is-fullheight"
        style     = {{ clipPath: 'none' }}
        >
        <Nav />
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1">
              Oops! <span className="has-text-warning">Not found</span>.
            </h1>
            <h2 className="subtitle">Sorry. What you were looking for was not found.</h2>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
  
}

export default NotFound;