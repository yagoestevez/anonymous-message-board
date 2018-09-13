'use strict';

const mongoose = require( 'mongoose' );
const Schema   = require( './Schema' );

module.exports = class ThreadModel {

  async getTopTenThreads ( board ) {
    const Thread = await Schema.getThreadSchema( board );
    const listOfThreads = await Thread
      .find( )
      .limit( 10 )
      .sort( '-bumped_on' )
      .select( '-reported -delete_password -replies.reported -replies.delete_password' );
    for ( let thread in listOfThreads )
      listOfThreads[thread].replies = listOfThreads[thread].replies.reverse( ).slice( 0,3 );
    return listOfThreads;
  }

  async getOneThread ( board, threadId ) {
    const Thread = await Schema.getThreadSchema( board );
    const thread = await Thread
      .findOne( { _id: threadId } )
      .select( '-reported -delete_password -replies.reported -replies.delete_password' );
    return thread;
  }

  async saveThread ( board, text, delPasswd ) {
    const Thread = await Schema.getThreadSchema( board );
    const thread = new Thread( {
      text            : text,
      created_on      : new Date( ),
      bumped_on       : new Date( ),
      reported        : false,
      delete_password : delPasswd,
      replies         : []
    } );
    const results = await thread.save( );
    return results;
  }

  async reportOneThread ( board, threadId ) {
    const Thread = await Schema.getThreadSchema( board );
    const reportedThread = await Thread.findOneAndUpdate( { _id: threadId }, { reported: true } );
    return reportedThread;
  }

  async deleteOneThread ( board, threadId ) {
    const Thread = await Schema.getThreadSchema( board );
    const thread = await Thread.findOneAndDelete( { _id: threadId } );
    return thread;
  }

  // Password hash getter.
  async getThreadHash ( board, threadId ) {
    const Thread = await Schema.getThreadSchema( board );
    const hash = await Thread.findOne( { _id: threadId } ).select( 'delete_password' );
    return hash;
  }

}