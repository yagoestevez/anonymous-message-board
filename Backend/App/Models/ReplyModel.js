'use strict';

const mongoose = require( 'mongoose' );
const Schema   = require( './Schema' );

module.exports = class ReplyModel {

  async saveReply ( board, threadId, text, delPasswd ) {
    const Reply = await Schema.getReplySchema( );
    const reply = new Reply( {
      text            : text,
      created_on      : new Date( ),
      reported        : false,
      delete_password : delPasswd
    } );
    const Thread = await Schema.getThreadSchema( board );
    const replyQuery = await Thread.findOneAndUpdate(
      { _id: threadId },
      { $push: { replies: reply }, bumped_on: new Date( ) },
      { new   : true }
    );
    return replyQuery;
  }

  async reportOneReply ( board, threadId, reply_id ) {
    const Thread = await Schema.getThreadSchema( board );
    const reportedThread = await Thread.findOneAndUpdate(
      { _id: threadId, 'replies._id': reply_id },
      { 'replies.$.reported': true }
    );
    return reportedThread;
  }

  async deleteOneReply ( board, threadId, reply_id ) {
    const Thread = await Schema.getThreadSchema( board );
    const deletedThread = await Thread
      .findOneAndUpdate(
        { _id: threadId, 'replies._id': reply_id },
        { 'replies.$.text': '[deleted]' }
      );
    return deletedThread;
  }

  async getReplyHash ( board, threadId, replyId ) {
    const Thread = await Schema.getThreadSchema( board );
    const hash = await Thread
      .findOne( { _id: threadId, 'replies._id': replyId } )
      .select( 'replies.$.delete_password' );
    return hash.replies[0];
  }

}