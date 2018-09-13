import React    from 'react';
import { Link } from 'react-router-dom';
import API      from '../Helpers/API';
import Thread   from '../Threads/Thread';
import Nav      from '../Utils/Nav';
import Footer   from '../Utils/Footer';

class SingleBoard extends React.Component {

  constructor ( props ) {
    super( props );
    this.state = { threads: [ ] }
    this.board = props.match.params.board;
    this.getThreads( );
  }

  getThreads = ( ) => {
    API.getThreads( this.board, threads => this.setState( { threads } ) )
  }

  render() {
    if ( !this.state.threads )
      console.log( this.state.threads )

    return (
      <React.Fragment>
        <section className="hero is-danger is-medium">
          <Nav />
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Welcome to <span className="has-text-warning">{ this.board.toUpperCase( ) }</span> board</h1>
              <h2 className="subtitle">Have fun!</h2>
            </div>
          </div>
        </section>
        <section
          className="section columns is-centered"
          style={{ display: this.state.threads.length === 0 && 'none' }}
          >
          <div className="column is-two-thirds">
            <p className="section-title title is-3 has-text-grey-dark has-text-centered">
              Showing the <span className="has-text-danger">last 10 threads</span>
            </p>
          </div>
        </section>
        <section
          className="section"
          style={{ display: this.state.threads.length > 0 && 'none', minHeight: '50vh' }}
          >
          <p className="section title is-3 has-text-grey-dark has-text-centered">
            Sorry. <span className="has-text-danger">There are no posts so far</span>.
          </p>
          <p className="subtitle is-5 has-text-grey-dark has-text-centered">
            You can <Link to="/publish" className="has-text-danger">click here</Link> to create a new thread if you want.
          </p>
        </section>
        {
          this.state.threads.map( ( thread,i ) =>
            <Thread
              key        = { i                }
              board      = { this.board       }
              thread     = { thread           }
              getThreads = { this.getThreads  }
            />
          )
        }
        <Footer />
      </React.Fragment>
    );
  }

}

export default SingleBoard;
