import React       from 'react';
import { Link }    from 'react-router-dom';
import Replies     from '../Replies/Replies';
import ReplyForm   from '../Replies/ReplyForm';
import DeleteModal from '../Utils/DeleteModal';
import Nav         from '../Utils/Nav';
import Footer      from '../Utils/Footer';
import NotFound    from '../404/NotFound';
import API         from '../Helpers/API';

class SingleThread extends React.Component {

  state = {
    notify   : '',
    modal    : false,
    id       : '',
    redirect : true,
    threadID : null,
    created  : '',
    bumped   : '',
    replies  : [ ],
    text     : ''
  }

  report = ( reply_id = false ) => {
    const type = reply_id ? 'comment' : 'thread';
    API.report(
      this.props.match.params.board,
      this.state.id,
      reply_id,
      ( )   => this.setState( { notify: `This ${ type } has been reported. Thank you.` } ),
      error => this.setState( { notify: error } )
    )
  }

  toggleModal = ( type, id, redirect ) => {
    this.setState( { modal: type, id, redirect } );
  }

  loadThread = ( ) => {
    API.getFullThread(
      this.props.match.params.board,
      this.props.match.params.id,
      data => {
        this.setState( {
          threadID : data._id,
          id       : data._id,
          created  : new Date( data.created_on ).toLocaleString( 'en-US'),
          bumped   : new Date( data.bumped_on  ).toLocaleString( 'en-US'),
          replies  : data.replies.reverse( ),
          text     : data.text
        } )
      },
      error => console.log( error )
    )
  };

  componentWillMount = ( ) => {
    this.loadThread( );
  }

  render ( ) {
    if ( !this.state.threadID )
      return <NotFound />;

    const board       = this.props.match.params.board;
    const replies     = this.state.replies;
    const repliesList = replies.length === 0 || replies.map( ( reply,i ) =>
                        <Replies
                          key         = { i                }
                          reply       = { reply            }
                          toggleModal = { this.toggleModal }
                          reportReply = { this.report      }
                        /> );
    return (
      <React.Fragment>
        <section className="hero is-danger is-medium">
          <Nav />
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">{this.state.text}</h1>
              <h2 className="subtitle is-4">
               — Posted on <span className="has-text-warning">
                <Link to={ `/b/${ board }` }>{ board }</Link></span> —
              </h2>
              <p>
                { this.state.created }
              </p>
            </div>
          </div>
        </section>
        <section className="columns is-centered">
          <article className="thread-article section column is-two-thirds">
            <div className="card">
              <div className="card-content">
                <div className="level">
                  <p className="thread-title title is-4 has-text-grey-dark">
                    What people think about this
                  </p>
                </div>
                <p></p>
              </div>
              <div style={{ display: replies.length === 0 && 'none' }}>
                <p className="reply-title title is-6 has-text-centered">
                  Comments on this thread <br />
                  <small>(Most recent first)</small>
                </p>
              </div>
              <div style={{ display: replies.length > 0 && 'none' }}>
                <p className="reply-title title is-6 has-text-centered">
                  There are no comments yet. Want to start a conversation?
                </p>
              </div>
              { repliesList }
              <ReplyForm
                thread_id  = { this.state.threadID }
                board      = { board               }
                updateList = { this.loadThread     }
                />
              <footer className="card-footer">
                <a
                  onClick={ ( ) => this.report( ) }
                  className="card-footer-item has-text-grey"
                  title="Report Thread">
                  Report Thread
                </a>
                <a
                  onClick={ ( ) => this.toggleModal( 'thread', this.state.threadID ) }
                  className="card-footer-item has-text-danger"
                  title="Delete Thread">
                  Delete Thread
                </a>
              </footer>
            </div>
            <div className = {
              this.state.notify
                ? 'notification showNotification is-warning'
                : 'notification is-warning'
            } >
              <button
                className ="delete"
                onClick   = { ( ) => this.setState( { notify: false } ) }
              ></button>
              {
                this.state.notify
              }
            </div>
          </article>
          <DeleteModal
            modal       = { this.state.modal             }
            id          = { this.state.id                }
            toggleModal = { this.toggleModal             }
            board       = { board                        }
            thread      = { { _id: this.state.threadID } }
            loadThread  = { this.loadThread              }
          />
        </section>
        <Footer />
      </React.Fragment>
    );
  }
  
}

export default SingleThread;