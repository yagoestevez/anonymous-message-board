import React  from 'react';
import API    from '../Helpers/API';
import Thread from '../Threads/Thread';
import Nav    from '../Utils/Nav';
import Footer from '../Utils/Footer';

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
        <section className="section columns is-centered">
          <div className="column is-two-thirds">
            <p className="section-title title is-3 has-text-grey-dark has-text-centered">
              Showing the <span className="has-text-danger">last 10 threads</span>
            </p>
          </div>
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
