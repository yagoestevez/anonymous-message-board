'use strict';

const mongoose = require( 'mongoose' );

module.exports = class BoardModel {

  async getAllBoards ( ) {
    return mongoose.connection.db
      .listCollections( )
      .toArray( );
  }

}