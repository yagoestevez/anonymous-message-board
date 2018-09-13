'use strict';

const mongoose   = require( 'mongoose' );

const DB_URI     = process.env.DB;

module.exports = class DB {

  constructor ( ) {
    const connection = mongoose.connect( DB_URI, { useNewUrlParser: true } )
    if ( !connection )
      throw { code: 500, text: `Cannot connect to the database.` };
  }

}