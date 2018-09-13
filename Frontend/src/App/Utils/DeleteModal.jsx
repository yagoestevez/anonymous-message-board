import React from 'react';
import API   from '../Helpers/API';

class DeleteModal extends React.Component {

  state = {
    password: '',
    error   : ''
  }

  setInputValue = event => {
    this.setState( {
      password: event.target.value
    } );
  }

  delete = ( event ) => {
    const isReply = this.props.modal === 'reply';
    API.delete(
      event,
      this.props.board,
      this.props.thread._id,
      isReply ? this.props.id : false,
      this.state.password,
      data => {
        this.props.getThreads( );
        setTimeout( ( ) => {
          this.props.toggleModal( );
        }, 200 ).bind( this );
      },
      error => this.setState( {
        error: error.response.data ? error.response.data : 'Oops. Something went wrong'
      } )
    );
  }

  render ( ) {
    const type  = this.props.modal;
    const title = type === 'thread' ? 'Delete Thread' : 'Delete Reply';

    return (
      <div className={ this.props.modal ? 'modal is-active' : 'modal' }>
        <form onSubmit={ e => this.delete( e ) }>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head has-background-danger">
              <p className="modal-card-title has-text-light">{ title }</p>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <div className="control">
                  <label className="label has-text-grey">
                    Are you sure? If so, enter the { type }'s password:
                  </label>
                </div>
                <p className="control is-expanded has-icons-left has-icons-right">
                  <input
                    id          = "password"
                    className   = "input is-large"
                    type        = "password"
                    placeholder = "Type the password"
                    onChange    = { this.setInputValue  } 
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                type      = "submit"
                className = "button is-danger"
                onClick   = { e => this.delete( e ) }>
                DELETE
              </button>
              <button
                type      = "button"
                className = "button is-light"
                onClick   = { ( ) => this.props.toggleModal( false ) }>
                Nevermind
              </button>
            </footer>
            <div className={
              this.state.error
                ? 'notification showNotification is-danger'
                : 'notification'
            }>
              { this.state.error }
            </div>
          </div>
        </form>

      </div>
    );
  }

}

export default DeleteModal;