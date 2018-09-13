'use strict';

const mongoose = require( 'mongoose' );

const replySchema  = new mongoose.Schema( {
  text            : { type: String  , required: true },
  created_on      : { type: Date    , required: true },
  reported        : { type: Boolean , required: true },
  delete_password : { type: String  , minlength: 20, maxlength: 1024, required: true }
} );

const threadSchema = new mongoose.Schema( {
  text            : { type: String  , required: true },
  created_on      : { type: Date    , required: true },
  bumped_on       : { type: Date    , required: true },
  reported        : { type: Boolean , required: true },
  replies         : { type: [replySchema] },
  delete_password : { type: String  , minlength: 20, maxlength: 1024, required: true }
} );

module.exports = {
  getThreadSchema : async function ( collection ) {
    return await mongoose.model( 'Thread', threadSchema, collection );
  },
  getReplySchema  : async function ( ) {
    return await mongoose.model( 'Reply', replySchema );
  }
}