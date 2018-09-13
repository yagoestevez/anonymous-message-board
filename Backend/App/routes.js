'use strict';

const router           = require( 'express' ).Router( );
const Database         = require( './Models/DB' );
const ThreadController = require( './Controllers/ThreadController' );
const ReplyController  = require( './Controllers/ReplyController' );
const BoardController  = require( './Controllers/BoardController' );
const thread           = new ThreadController( );
const reply            = new ReplyController( );
const board            = new BoardController( );
new Database( );

// Root entrypoint.
router.get( `/`,                    ( req,res ) => res.render( 'index'  ) );

// Boards entrypoints.
router.get( '/b/:board',            ( req,res ) => res.render( 'board'  ) );
router.get( '/b/:board/:threadid',  ( req,res ) => res.render( 'thread' ) );

// API entrypoints.
router.route( `/api/boards` )
  .post(   async ( req,res ) => res.send( await board.listBoards        ( req ) ) );

router.route( `/api/threads/:board` )
  .get(    async ( req,res ) => res.send( await thread.getTopTenThreads ( req ) ) )
  .post(   async ( req,res ) => res.send( await thread.postThread       ( req ) ) )
  .put(    async ( req,res ) => res.send( await thread.reportThread     ( req ) ) )
  .delete( async ( req,res ) => res.send( await thread.deleteThread     ( req ) ) );

router.route( `/api/replies/:board` )
  .get(    async ( req,res ) => res.send( await thread.getThread        ( req ) ) )
  .post(   async ( req,res ) => res.send( await reply.postReply         ( req ) ) )
  .put(    async ( req,res ) => res.send( await reply.reportReply       ( req ) ) )
  .delete( async ( req,res ) => res.send( await reply.deleteReply       ( req ) ) );

// 404 errors.
router.all( '*', ( req,res ) => res.status( 404 ).render( '404' ) );

module.exports = router;