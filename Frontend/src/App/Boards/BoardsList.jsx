import React    from 'react';
import { Link } from 'react-router-dom';
import API      from '../Helpers/API';
import Nav      from '../Utils/Nav';
import Footer   from '../Utils/Footer';

class Boards extends React.Component {

  state = {
    boards: [ ]
  }

  componentWillMount ( ) {
    API.getAllBoards(
      boards => this.setState( { boards } ),
      error  => console.log( error )
    );
  }

  render() {
    return (
      <React.Fragment>
        <section className="hero is-danger is-medium">
          <Nav />
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Welcome to the <span className="has-text-warning">Anonymous Message Board</span></h1>
              <h2 className="subtitle">Select a board to see what's people talking about.</h2>
            </div>
          </div>
        </section>
        <section className="section columns is-centered">
          <div className="column is-two-thirds">
            <p className="section-title title is-3 has-text-grey-dark has-text-centered">
              Choose <span className="has-text-danger">a board</span> of your interest
            </p>
          </div>
        </section>
        <section className="section is-centered">
          <div className="container">
            {
              this.state.boards.map( ( b, i ) => (
                <div key={ i }>
                  <div className="box bordered">
                    <article>
                      <div className="media-content">
                        <div className="content has-text-centered">
                          <p className="title is-3">{ b }</p>
                        </div>
                        <Link to={ '/b/' + b } className="button is-danger is-fullwidth is-medium">
                          Open Board
                        </Link>
                      </div>
                    </article>
                  </div>
                </div>
              ) )
            }
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }

}

export default Boards;
