'use strict';

const ThreadModel = require( '../Models/ThreadModel' );
const bcrypt      = require( 'bcrypt' );

module.exports = class ThreadController {

  constructor ( ) {
    this.threadModel = new ThreadModel( );
  }

  async getTopTenThreads ( req ) {
    const topTen = await this.threadModel.getTopTenThreads( req.params.board );
    if ( topTen.length === 0 )
      throw { code: 400, text: `Sorry, the board "${req.params.board}" is empty.` };
    return topTen;
  }

  async getThread ( req ) {
    if ( !req.query.thread_id )
      throw { code: 400, text: `A parameter thread_id is required.` };
    const thread = await this.threadModel.getOneThread( req.params.board, req.query.thread_id );
    if ( !thread )
      throw { code: 404, text: `Sorry, but the thread ID was not found. Try again with a different ID.` }; 
    return thread;
  }

  async postThread ( req ) {
    const board = req.params.board;
    const { text, delete_password } = req.body;
    if ( !text || !delete_password )
      throw { code: 400, text: 'Parameters "text" and "delete_password" are required.' };
    const crypticPasswd = await this.hashPasswd( delete_password );
    const threadPosted = await this.threadModel.saveThread( board, text, crypticPasswd );
    if ( !threadPosted )
      throw { code: 500, text: `Sorry. Something went wrong. Please, try again.` }; 
    return `Thread "${threadPosted.text}" has been successfully posted`;
  }

  async reportThread ( req ) {
    const { board } = req.params;
    const { thread_id } = req.body;
    if ( !thread_id )
      throw { code: 400, text: '"thread_id" is required.' };
    const reportedThread = await this.threadModel.reportOneThread( board, thread_id );
    if ( reportedThread === null )
      throw { code: 404, text: `Couldn't report thread: ID Not found` };
    return 'success';
  }

  async deleteThread ( req ) {
    const { board } = req.params;
    const { thread_id, delete_password } = req.body;
    if ( !thread_id || !delete_password )
      throw { code: 400, text: '"thread_id and "delete_password" are required.' };
    const hash = await this.threadModel.getThreadHash( board, thread_id );
    const isAuthorized = await this.verifyPasswd( delete_password, hash );
    if ( isAuthorized ) {
      const deletedThread = await this.threadModel.deleteOneThread( board, thread_id );
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

};