import React       from 'react';

const Replies = props => (
  <div className="box">
    <div className="level is-mobile">
      <div>
        <p className="is-fullwidth reply-text">
          { props.reply.text }
        </p>
      </div>
      <div className="level-right">
        <a
          className="level-item"
          onClick={ ( ) => props.reportReply( props.reply._id ) }
          >
          <span className="icon is-small has-text-grey">
            <i className="fas fa-flag" aria-hidden="true" title="Report Reply"></i>
          </span>
        </a>
        <a
          className="level-item"
          onClick={ ( ) => props.toggleModal( 'reply', props.reply._id, false ) }
          >
          <span className="icon is-small has-text-danger">
            <i className="fas fa-trash-alt" aria-hidden="true" title="Delete Reply"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
);

export default Replies;