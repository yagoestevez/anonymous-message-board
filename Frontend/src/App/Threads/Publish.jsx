import React       from 'react';
import PublishForm from './PublishForm';
import Nav         from '../Utils/Nav';
import Footer      from '../Utils/Footer';
import 'bulma/css/bulma.css';
import '../Styles.css';

const Publish = ( ) => (
  <React.Fragment>
    <section className="hero is-danger is-medium">
      <Nav />
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">Share <span className="has-text-warning">your thoughts</span> here</h1>
          <h2 className="subtitle">Share your ideas with the world, <u>anonymously</u>!</h2>
        </div>
      </div>
    </section>
    <section className="section columns is-centered">
      <div className="column is-two-thirds">
        <p className="section-title title is-3 has-text-grey-dark has-text-centered">
          Publish a <span className="has-text-danger">new thread</span>
        </p>
        <PublishForm />
      </div>
    </section>
    <Footer />
  </React.Fragment>
);

export default Publish;
