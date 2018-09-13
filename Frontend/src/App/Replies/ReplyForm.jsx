import React from 'react';
import API   from '../Helpers/API';

class ReplyForm extends React.Component {

  constructor( props ) {
    super( props )
    this.state = {
      message  : '',
      password : ''
    }
  }

  postReply = event => {
    API.post(
      'reply',
      event,
      this.props.board,
      this.props.thread_id,
      this.state.message,
      this.state.password,
      ( ) => {
        this.props.updateList( );
        this.setState( { message: '', password: '' } );
      },
      error => console.log( error )
    );
  }

  setInputValue = event => {
    const option = event.target.value;
    const id     = event.target.id;
    this.setState( { [id]: option } );
  }

  render ( ) {
    return (
      <div>
        <form onSubmit={ this.postReply }>
          <p className="reply-to-title title is-5 has-text-centered">Add your comment</p>
          <section className="modal-card-body">
            <div className="field">
              <div className="control">
                <label className="label has-text-grey">You're free to express yourself.</label>
              </div>
              <div className="control">
                <textarea
                  id          = "message"
                  className   = "textarea input is-medium"
                  placeholder = "Go ahead and type something awesome!"
                  onChange    = { this.setInputValue }
                  required    = { true }
                  value       = { this.state.message }>
                </textarea>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label has-text-grey">Set a password in case you want to delete this reply:</label>
              </div>
              <p className="control is-expanded has-icons-left has-icons-right">
                <input
                  id          = "password"
                  className   = "input is-medium"
                  type        = "password"
                  placeholder = "Choose a password"
                  onChange    = { this.setInputValue } 
                  required    = { true }
                  value       = { this.state.password }
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <button
              type="submit"
              className="button is-danger is-medium is-fullwidth"
              onClick={ this.postReply }>
              Reply
            </button>
          </section>
        </form>
      </div>
    );
  }

}

export default ReplyForm;