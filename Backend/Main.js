'use strict';

require( 'dotenv' ).config( );
const express      = require( 'express' );
const cors         = require( 'cors' );
const helmet       = require( 'helmet' );
const pug          = require( 'pug' );
const asyncErrors  = require( 'express-async-errors' );
const errorHandler = require( './App/Middlewares/errorHandler.js' );
const routes       = require( './App/routes' );
const fccTesting   = require( './Testing/FCC/fcctesting' );
const runner       = require( './Testing/FCC/test-runner' );

const app  = express( );
const PORT = process.env.PORT || 3000;

app.set( 'view engine', 'pug' );
app.set( 'views', './App/Views' );
app.use( '/assets', express.static( 'App/Views/Assets' ) );

// For FCC testing purposes only
app.use( cors( { origin: '*' } ) );

app.use( express.json( ) );
app.use( express.urlencoded( { extended: true } ) );
app.use( helmet( {
  noCache             : true,
  hidePoweredBy       : { setTo  : 'PHP 4.2.0'    },
  xssFilter           : true,
  frameguard          : { action : 'sameorigin'   },
  dnsPrefetchControl  : { allow  : false          },
  referrerPolicy      : { policy : 'same-origin'  }
} ) );

// For FCC testing purposes.
fccTesting( app );

// Router.
app.use( routes );

// Error handler middleware.
app.use( errorHandler );

// Start the server and testing suite.
app.listen( PORT, ( ) => console.log( ` -> Server open :: http://localhost:${PORT}/ <- ` ) );

// For freeCodeCamp testing.
module.exports = app;