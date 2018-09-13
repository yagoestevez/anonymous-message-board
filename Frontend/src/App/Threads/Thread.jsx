import React       from 'react';
import Replies     from '../Replies/Replies';
import ReplyForm   from '../Replies/ReplyForm';
import DeleteModal from '../Utils/DeleteModal';
import { Link }    from 'react-router-dom';
import API         from '../Helpers/API';

class Thread extends React.Component {

  state = {
    notify : '',
    modal  : false
  }

  report = ( reply_id = false ) => {
    const type = reply_id ? 'comment' : 'thread';
    API.report(
      this.props.board,
      this.props.thread._id,
      reply_id,
      ( )   => this.setState( { notify: `This ${ type } has been reported. Thank you.` } ),
      error => this.setState( { notify: error } )
    )
  }

  toggleModal = ( type, id ) => {
    this.setState( { modal: type, id: id } );
  }

  render ( ) {
    const thread      = this.props.thread;
    const replies     = this.props.thread.replies;
    const repliesList = replies.length === 0 || replies.map( ( reply,i ) =>
                        <Replies
                          key         = { i                }
                          reply       = { reply            }
                          toggleModal = { this.toggleModal }
                          reportReply = { this.report      }
                        /> );
    return (
      <section className="columns is-centered">
        <article
          id        = { thread._id }
          className = "thread-article section column is-two-thirds"
          >
          <div className="card">
            <div className="card-content">
              <div className="level">
                <p className="thread-title title is-4 has-text-grey-dark">{ this.props.thread.text }</p>
              </div>
              <p className="level">
                <small className="time level-left">
                  created on &nbsp;
                  <time dateTime={ thread.created_on }>
                    { new Date( thread.created_on ).toLocaleString( 'en-US') }
                  </time>
                </small>
                <small className="time level-right">
                  updated on &nbsp;
                  <time dateTime={ thread.bumped_on }>
                    { new Date( thread.bumped_on ).toLocaleString( 'en-US') }
                  </time>
                </small>
              </p>
            </div>
            <div style={{ display: replies.length === 0 && 'none' }}>
              <p className="reply-title title is-6 has-text-centered">Latest 3 Replies</p>
            </div>
            { repliesList }
            <ReplyForm
              thread_id  = { thread._id            }
              board      = { this.props.board      }
              updateList = { this.props.getThreads }
              />
            <footer className="card-footer">
              <Link
                to        = { `/b/${this.props.board}/thread/${thread._id}` }
                className = "card-footer-item has-text-grey"
                title     = "Open Full Thread">
                Read all comments
              </Link>
              <a
                onClick={ ( ) => this.report( ) }
                className="card-footer-item has-text-grey"
                title="Report Thread">
                Report Thread
              </a>
              <a
                onClick={ ( ) => this.toggleModal( 'thread', thread._id ) }
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
          modal       = { this.state.modal       }
          id          = { this.state.id          }
          toggleModal = { this.toggleModal       }
          board       = { this.props.board       }
          thread      = { this.props.thread      }
          getThreads  = { this.props.getThreads  }
        />
      </section>
    );
  }


  
}

export default Thread;