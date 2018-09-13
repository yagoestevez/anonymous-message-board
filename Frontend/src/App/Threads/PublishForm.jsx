import React    from 'react';
import { Link } from 'react-router-dom';
import API      from '../Helpers/API';

class PublishForm extends React.Component {

  constructor ( props ) {
    super( props );
    this.state = {
      password      : '',
      message       : '',
      board         : '',
      boardsList    : [],
      showNewField  : false,
      notify        : false
    }
  }

  setInputValue = event => {
    const id     = event.target.id === 'new-board' ? 'board' : event.target.id;
    const option = id === 'board'
                   ? event.target.value.toLowerCase( )
                   : event.target.value;
    this.setState( {
      [id]         : option,
      notify       : false,
      showNewField : option === 'new board' || event.target.id === 'new-board'
    } );
  }

  postNewThread = event => {
    API.post(
      'thread',
      event,
      this.state.board,
      false,
      this.state.message,
      this.state.password,
      ( )   => this.setState( { notify: true } ),
      error => this.setState( { error } )
    );
  }

  componentWillMount ( ) {
    API.getAllBoards(
      data  => this.setState( { boardsList: data } ),
      error => this.setState( { error } )
    )
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={ this.postNewThread }>

          <div className="field">
            <div className="control">
              <label className="label has-text-centered has-text-grey">Write your message to the world:</label>
            </div>
            <div className="control">
              <textarea
                id          = "message"
                className   = "textarea input is-large has-text-centered"
                placeholder = "Go ahead and type something awesome!"
                onChange    = { this.setInputValue }
                required>
              </textarea>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label has-text-centered has-text-grey">Set a password in case you want to delete the thread:</label>
            </div>
            <p className="control is-expanded has-icons-left has-icons-right">
              <input
                id          = "password"
                className   = "input is-large has-text-centered"
                type        = "password"
                placeholder = "Choose a password"
                onChange    = { this.setInputValue } 
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <div className="control">
              <label
                className="label has-text-centered has-text-grey"
                >
                Select a board to publish your thread on:
              </label>
            </div>
            <div className="control has-icons-left">
              <div className="select is-medium is-fullwidth">
                <select
                  id="board"
                  className="has-text-centered"
                  onChange={ this.setInputValue }
                  required
                  >
                  <option selected disabled>Select a Board</option>
                  <option>New Board</option>
                  {
                    this.state.boardsList.map( ( b,i ) => {
                      return <option value={ b } key={ i }>{ b }</option>
                    } )
                  }
                </select>
              </div>
              <span className="icon is-medium is-left">
                <i className="far fa-comments"></i>
              </span>
            </div>
          </div>

          <div className="field" style={{ display: this.state.showNewField ? 'block' : 'none' }}>
            <div className="control">
              <label className="label has-text-grey has-text-centered">Set a name for the new board:</label>
            </div>
            <p className="control is-expanded has-icons-left has-icons-right">
              <input
                id          = "new-board"
                className   = "input is-large has-text-centered"
                type        = "text"
                placeholder = "Choose a new board name"
                onChange    = { this.setInputValue       } 
                required    = { this.state.showNewField  }
              />
              <span className="icon is-small is-left">
                <i className="far fa-comments"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-danger is-fullwidth is-large">Publish!</button>
            </div>
          </div>
        </form>
        <div className={
          this.state.notify
            ? 'notification showNotification'
            : 'notification'
        }>
          <button
            className="delete"
            onClick={ ( ) => this.setState( { notify: false } ) }
            >
            </button>
          A new thread was created on { this.state.board }. { ' ' }
          <Link to={ `/b/${this.state.board}` }>Click here</Link> to open the board.
        </div>
      </React.Fragment>
    );
  }

}

export default PublishForm;