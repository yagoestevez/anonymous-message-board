'use strict';

const ReplyModel  = require( '../Models/ReplyModel' );
const bcrypt      = require( 'bcrypt' );

module.exports = class ReplyController {

  constructor ( ) {
    this.replyModel = new ReplyModel( );
  }

  async postReply ( req ) {
    const board = req.params.board;
    const { text, delete_password, thread_id } = req.body;
    if ( !text || !delete_password || !thread_id )
      throw { code: 400, text: '"thread_id, "text" and "delete_password" are required.' };
    const crypticPasswd = await this.hashPasswd( delete_password );
    const replyPosted = await this.replyModel.saveReply( board, thread_id, text, crypticPasswd );
    if ( !replyPosted )
      throw { code: 404, text: `Sorry. Either the board "${board}" or the thread_id "${thread_id}" was not found.` }; 
    return `Reply "${replyPosted.replies[replyPosted.replies.length-1].text}" successfully posted.`;
  }

  async reportReply ( req ) {
    const { board } = req.params;
    const { thread_id, reply_id } = req.body;
    if ( !thread_id || !reply_id )
      throw { code: 400, text: '"thread_id" and "reply_id" are required.' };
    const reportedReply = await this.replyModel.reportOneReply( board, thread_id, reply_id );
    if ( reportedReply === null )
      throw { code: 404, text: `Couldn't report reply: ID Not found` };
    return 'success';
  }

  async deleteReply ( req ) {
    const { board } = req.params;
    const { thread_id, reply_id, delete_password } = req.body;
    if ( !thread_id || !reply_id || !delete_password )
      throw { code: 400, text: '"thread_id, "reply_id" and "delete_password" are required.' };
    const hash = await this.replyModel.getReplyHash( board, thread_id, reply_id );
    const isAuthorized = await this.verifyPasswd( delete_password, hash );
    if ( isAuthorized ) {
      const deletedThread = await this.replyModel.deleteOneReply( board, thread_id, reply_id );
      return 'success';
    }
    throw { code: 400, text: 'incorrect password' };
    // return 'incorrect password'; // THIS IS REQUIRED BY FREECODECAMP
  }

  // Password handlers.
  async hashPasswd ( passwd ) {
    const salt = await bcrypt.genSalt( 12 );
    const hash = await bcrypt.hash( passwd, salt );
    return hash;
  }

  async verifyPasswd ( passwd, hash ) {
    const compared = await bcrypt.compare( passwd, hash.delete_password );
    return compared;
  }

}